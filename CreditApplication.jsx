const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Send, CheckCircle, User, Home, Briefcase, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from 'sonner';

const INITIAL = {
  // Personal
  full_name: '', email: '', phone: '', dob: '',
  ssn_last4: '', drivers_license: '',
  // Address
  address: '', city: '', state: '', zip: '',
  // Employment
  employment_status: '', employer: '', job_title: '',
  monthly_income: '', years_employed: '',
  // Vehicle interest
  vehicle_interest: '', down_payment: '', trade_in: '',
  // Additional
  notes: '',
};

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-heading text-sm tracking-wider text-foreground">{title}</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Field = ({ label, required, full, children }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
      {label}{required && <span className="text-primary ml-1">*</span>}
    </label>
    {children}
  </div>
);

export default function CreditApplication() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target?.value ?? e }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const body = `
CREDIT APPLICATION / FINANCING INQUIRY
=======================================

PERSONAL INFORMATION
Full Name: ${form.full_name}
Email: ${form.email}
Phone: ${form.phone}
Date of Birth: ${form.dob}
SSN (Last 4): ${form.ssn_last4}
Driver's License #: ${form.drivers_license}

ADDRESS
${form.address}, ${form.city}, ${form.state} ${form.zip}

EMPLOYMENT
Status: ${form.employment_status}
Employer: ${form.employer}
Job Title: ${form.job_title}
Monthly Income: $${form.monthly_income}
Years Employed: ${form.years_employed}

VEHICLE INTEREST
Vehicle of Interest: ${form.vehicle_interest}
Down Payment Available: $${form.down_payment}
Trade-In: ${form.trade_in}

ADDITIONAL NOTES
${form.notes}
    `.trim();

    await db.integrations.Core.SendEmail({
      to: 'info@prautogroup.com',
      subject: `Credit Application from ${form.full_name}`,
      body,
    });

    toast.success('Application submitted! We\'ll be in touch shortly.');
    setSubmitted(true);
    setSending(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-2xl text-foreground mb-3">APPLICATION RECEIVED</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you, <span className="text-foreground font-semibold">{form.full_name}</span>! We've received your credit application and will be in touch within 1 business day.
          </p>
          <button
            onClick={() => { setForm(INITIAL); setSubmitted(false); }}
            className="mt-8 text-primary text-sm hover:underline font-mono tracking-wider"
          >
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Financing</span>
          <h1 className="font-heading text-3xl md:text-5xl text-foreground mt-2">CREDIT APPLICATION</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg">
            Fill out the form below and our team will find the best financing options for you. All information is kept strictly confidential.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal */}
          <Section icon={User} title="PERSONAL INFORMATION">
            <Field label="Full Name" required>
              <Input required value={form.full_name} onChange={set('full_name')} className="bg-secondary border-border h-11" placeholder="John Doe" />
            </Field>
            <Field label="Email" required>
              <Input required type="email" value={form.email} onChange={set('email')} className="bg-secondary border-border h-11" placeholder="you@email.com" />
            </Field>
            <Field label="Phone" required>
              <Input required value={form.phone} onChange={set('phone')} className="bg-secondary border-border h-11" placeholder="(614) 555-1234" />
            </Field>
            <Field label="Date of Birth" required>
              <Input required type="date" value={form.dob} onChange={set('dob')} className="bg-secondary border-border h-11" />
            </Field>
            <Field label="SSN – Last 4 Digits" required>
              <Input required maxLength={4} value={form.ssn_last4} onChange={set('ssn_last4')} className="bg-secondary border-border h-11" placeholder="####" />
            </Field>
            <Field label="Driver's License #">
              <Input value={form.drivers_license} onChange={set('drivers_license')} className="bg-secondary border-border h-11" placeholder="OH12345678" />
            </Field>
          </Section>

          {/* Address */}
          <Section icon={Home} title="CURRENT ADDRESS">
            <Field label="Street Address" required full>
              <Input required value={form.address} onChange={set('address')} className="bg-secondary border-border h-11" placeholder="123 Main St" />
            </Field>
            <Field label="City" required>
              <Input required value={form.city} onChange={set('city')} className="bg-secondary border-border h-11" placeholder="Columbus" />
            </Field>
            <Field label="State" required>
              <Input required value={form.state} onChange={set('state')} className="bg-secondary border-border h-11" placeholder="OH" maxLength={2} />
            </Field>
            <Field label="ZIP Code" required>
              <Input required value={form.zip} onChange={set('zip')} className="bg-secondary border-border h-11" placeholder="43229" />
            </Field>
          </Section>

          {/* Employment */}
          <Section icon={Briefcase} title="EMPLOYMENT INFORMATION">
            <Field label="Employment Status" required>
              <Select value={form.employment_status || 'placeholder'} onValueChange={v => setForm(f => ({ ...f, employment_status: v === 'placeholder' ? '' : v }))}>
                <SelectTrigger className="bg-secondary border-border h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Employer / Company">
              <Input value={form.employer} onChange={set('employer')} className="bg-secondary border-border h-11" placeholder="ABC Corp" />
            </Field>
            <Field label="Job Title">
              <Input value={form.job_title} onChange={set('job_title')} className="bg-secondary border-border h-11" placeholder="Manager" />
            </Field>
            <Field label="Monthly Gross Income ($)" required>
              <Input required type="number" min="0" value={form.monthly_income} onChange={set('monthly_income')} className="bg-secondary border-border h-11" placeholder="3500" />
            </Field>
            <Field label="Years at Current Job">
              <Input type="number" min="0" value={form.years_employed} onChange={set('years_employed')} className="bg-secondary border-border h-11" placeholder="2" />
            </Field>
          </Section>

          {/* Vehicle & Financing */}
          <Section icon={DollarSign} title="VEHICLE & FINANCING">
            <Field label="Vehicle of Interest" full>
              <Input value={form.vehicle_interest} onChange={set('vehicle_interest')} className="bg-secondary border-border h-11" placeholder="e.g. 2021 Toyota Camry or Stock #1234" />
            </Field>
            <Field label="Down Payment Available ($)">
              <Input type="number" min="0" value={form.down_payment} onChange={set('down_payment')} className="bg-secondary border-border h-11" placeholder="1000" />
            </Field>
            <Field label="Trade-In Vehicle (Year / Make / Model)">
              <Input value={form.trade_in} onChange={set('trade_in')} className="bg-secondary border-border h-11" placeholder="2018 Honda Civic or None" />
            </Field>
            <Field label="Additional Notes" full>
              <Textarea value={form.notes} onChange={set('notes')} className="bg-secondary border-border min-h-[100px]" placeholder="Any other details we should know..." />
            </Field>
          </Section>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By submitting this form you authorize Prestige Rides – PR Auto Group to contact you regarding financing options. Your information is kept confidential and never shared or sold.
          </p>

          <Button
            type="submit"
            disabled={sending}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-widest text-sm"
          >
            {sending ? 'SUBMITTING...' : <><Send className="w-4 h-4 mr-2" /> SUBMIT APPLICATION</>}
          </Button>
        </form>
      </div>
    </div>
  );
}