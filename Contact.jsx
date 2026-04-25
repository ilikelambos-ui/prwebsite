const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await db.integrations.Core.SendEmail({
      to: 'info@prautogroup.com',
      subject: `Website Inquiry from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    });
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', phone: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Get In Touch</span>
          <h1 className="font-heading text-3xl md:text-5xl text-foreground mt-2">CONTACT US</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-foreground">GET DIRECTIONS</h2>
            
            <div className="space-y-4">
              {[
                { icon: MapPin, title: 'Location', content: '2300 E Dublin Granville Rd\nColumbus, OH 43229' },
                { icon: Clock, title: 'Hours', content: 'Monday–Saturday: 9AM–7PM\nSunday: Closed' },
                { icon: Mail, title: 'Email', content: 'info@prautogroup.com' },
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
                    <p className="text-sm text-foreground whitespace-pre-line">{content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="relative aspect-video bg-card border border-border rounded-lg overflow-hidden">
              <iframe
                title="Prestige Rides Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.5!2d-82.9534!3d40.0712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838f4e7d9b9c2b5%3A0x1!2s2300+E+Dublin+Granville+Rd%2C+Columbus%2C+OH+43229!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
              <a
                href="https://maps.google.com/?q=2300+E+Dublin+Granville+Rd,+Columbus,+OH+43229"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 flex items-center gap-2 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider px-4 py-2 rounded-sm hover:bg-primary/90 transition-all shadow-lg"
              >
                <MapPin className="w-3.5 h-3.5" /> GET DIRECTIONS
              </a>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-xl text-foreground mb-6">SEND A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Name</label>
                <Input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-card border-border h-12"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-card border-border h-12"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-card border-border h-12"
                    placeholder="(614) 555-1234"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
                <Textarea
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-card border-border min-h-[140px]"
                  placeholder="I'm interested in..."
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-body tracking-wider text-sm"
              >
                {sending ? 'SENDING...' : <><Send className="w-4 h-4 mr-2" /> SEND MESSAGE</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}