'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Shield, Award, Clock, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const countries = [
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Bahrain',
  'Other',
];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  country: z.string().min(1, 'Please select a country'),
  requirement: z.string().min(10, 'Please describe your needs (at least 10 characters)'),
});

type FormValues = z.infer<typeof formSchema>;

const trustSignals = [
  { icon: Shield, label: 'Government Approved Recruitment Agency' },
  { icon: Award, label: '20+ Years Proven Industry Experience' },
  { icon: Users, label: '10,000+ Successful Candidate Placements' },
  { icon: Clock, label: '4-Hour Initial Response Guarantee' },
];

export default function RequirementFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectionRef, isVisible] = useScrollAnimation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      country: '',
      requirement: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/requirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      toast({
        title: 'Requirement Submitted',
        description: 'Our recruitment experts will contact you within 24 hours.',
      });
      reset();
    } catch {
      toast({
        title: 'Submission Received',
        description: 'Our recruitment experts will contact you within 24 hours.',
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="requirement" className="bg-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">
            Employer Inquiry
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#061C33] tracking-tight mb-4">
            Submit Your Hiring Requirement
          </h2>
          <p className="text-slate-600 font-medium text-base lg:text-lg">
            Our recruitment experts will evaluate your needs and respond within 4 hours.
          </p>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column: Form Card */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#061C33] mb-1.5">
                  Full Name
                </label>
                <Input
                  placeholder="e.g. John Smith"
                  {...register('name')}
                  className={cn(
                    'h-11 bg-white border-slate-200 text-[#061C33] placeholder:text-slate-400 focus-visible:ring-[#FF5722]/30 focus-visible:border-[#FF5722]',
                    errors.name && 'border-red-500'
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#061C33] mb-1.5">
                  Company / Organization
                </label>
                <Input
                  placeholder="e.g. Aramco Solutions Ltd."
                  {...register('company')}
                  className={cn(
                    'h-11 bg-white border-slate-200 text-[#061C33] placeholder:text-slate-400 focus-visible:ring-[#FF5722]/30 focus-visible:border-[#FF5722]',
                    errors.company && 'border-red-500'
                  )}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#061C33] mb-1.5">
                  Target Hiring Country
                </label>
                <Select onValueChange={(val) => setValue('country', val, { shouldValidate: true })}>
                  <SelectTrigger
                    className={cn(
                      'h-11 w-full bg-white border-slate-200 text-[#061C33] focus-visible:ring-[#FF5722]/30 focus-visible:border-[#FF5722]',
                      errors.country && 'border-red-500'
                    )}
                  >
                    <SelectValue placeholder="Select country location" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#061C33] mb-1.5">
                  Detailed Hiring Requirement
                </label>
                <Textarea
                  placeholder="Specify job roles, required experience, team sizes, and project timeline..."
                  rows={4}
                  {...register('requirement')}
                  className={cn(
                    'bg-white border-slate-200 text-[#061C33] placeholder:text-slate-400 focus-visible:ring-[#FF5722]/30 focus-visible:border-[#FF5722]',
                    errors.requirement && 'border-red-500'
                  )}
                />
                {errors.requirement && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.requirement.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold h-12 text-base rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200"
              >
                {isSubmitting ? (
                  'Submitting Requirement...'
                ) : (
                  <>
                    Talk to Recruitment Expert
                    <Send className="ml-2 w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column: Trust Signals */}
          <div className="lg:col-span-2 space-y-4 pt-2">
            {trustSignals.map((signal, i) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, x: 25 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center gap-4 shadow-2xs"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <signal.icon className="w-5 h-5 text-sky-600 stroke-[2]" />
                </div>
                <p className="text-sm font-bold text-[#061C33] leading-snug">
                  {signal.label}
                </p>
              </motion.div>
            ))}

            {/* Fast Response Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-5 rounded-2xl bg-orange-50 border border-orange-100 text-[#061C33] shadow-2xs"
            >
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                <span className="font-bold text-[#061C33]">Fast Turnaround:</span> Our dedicated account management team starts reviewing candidate databases within 4 hours of receiving your requirement.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
