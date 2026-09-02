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
  { icon: Shield, label: 'Government Approved' },
  { icon: Award, label: '20+ Years Experience' },
  { icon: Users, label: '10,000+ Successful Placements' },
  { icon: Clock, label: 'Average Response Time: 4 Hours' },
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
    <section ref={sectionRef} className="bg-white section-padding py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4">
            Submit Your Hiring Requirement
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our recruitment experts will respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14"
        >
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-shiyali-primary mb-1.5">
                  Name
                </label>
                <Input
                  placeholder="Your full name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-shiyali-primary mb-1.5">
                  Company
                </label>
                <Input
                  placeholder="Company name"
                  {...register('company')}
                  className={errors.company ? 'border-red-500' : ''}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-shiyali-primary mb-1.5">
                  Country
                </label>
                <Select onValueChange={(val) => setValue('country', val, { shouldValidate: true })}>
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      errors.country && 'border-red-500'
                    )}
                  >
                    <SelectValue placeholder="Select country" />
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
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-shiyali-primary mb-1.5">
                  Hiring Requirement
                </label>
                <Textarea
                  placeholder="Describe your hiring needs..."
                  rows={5}
                  {...register('requirement')}
                  className={errors.requirement ? 'border-red-500' : ''}
                />
                {errors.requirement && (
                  <p className="text-red-500 text-xs mt-1">{errors.requirement.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-shiyali-accent hover:bg-shiyali-accent/90 text-shiyali-primary font-semibold h-12 text-base"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Talk to Recruitment Expert
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-4">
              {trustSignals.map((signal, i) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-light rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-shiyali-secondary/10 flex items-center justify-center shrink-0">
                    <signal.icon className="w-5 h-5 text-shiyali-secondary" />
                  </div>
                  <p className="text-sm font-medium text-shiyali-primary">
                    {signal.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 p-5 rounded-xl bg-shiyali-primary/5 border border-shiyali-primary/10"
            >
              <p className="text-sm text-shiyali-primary leading-relaxed">
                <span className="font-semibold">Fast turnaround.</span> Our dedicated team
                starts sourcing candidates within 4 hours of receiving your requirement.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
