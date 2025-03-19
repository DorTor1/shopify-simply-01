
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const formSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 digits.",
  }).max(19),
  cardholderName: z.string().min(2, {
    message: "Cardholder name is required.",
  }),
  expiryDate: z.string().min(5, {
    message: "Expiry date is required in MM/YY format.",
  }),
  cvv: z.string().min(3, {
    message: "CVV must be at least 3 digits.",
  }).max(4),
  saveCard: z.boolean().default(false),
});

interface PaymentFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isProcessing }) => {
  const [cardType, setCardType] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      saveCard: false,
    },
  });

  const detectCardType = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\s+/g, '');
    
    if (/^4/.test(cleanedNumber)) {
      return 'visa';
    } else if (/^5[1-5]/.test(cleanedNumber)) {
      return 'mastercard';
    } else if (/^3[47]/.test(cleanedNumber)) {
      return 'amex';
    } else if (/^6(?:011|5)/.test(cleanedNumber)) {
      return 'discover';
    }
    
    return '';
  };

  const formatCardNumber = (value: string) => {
    const cleanedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const cardType = detectCardType(cleanedValue);
    setCardType(cardType);
    
    const chunks = [];
    
    // Different formatting for Amex (4-6-5) vs others (4-4-4-4)
    if (cardType === 'amex') {
      for (let i = 0; i < cleanedValue.length && i < 15; i += i === 0 ? 4 : i === 4 ? 6 : 5) {
        chunks.push(cleanedValue.substring(i, i + (i === 0 ? 4 : i === 4 ? 6 : 5)));
      }
    } else {
      for (let i = 0; i < cleanedValue.length && i < 16; i += 4) {
        chunks.push(cleanedValue.substring(i, i + 4));
      }
    }
    
    return chunks.join(' ');
  };

  const formatExpiryDate = (value: string) => {
    const cleanedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (cleanedValue.length <= 2) {
      return cleanedValue;
    }
    
    return `${cleanedValue.substring(0, 2)}/${cleanedValue.substring(2, 4)}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="1234 5678 9012 3456"
                    {...field}
                    onChange={(e) => {
                      const formattedValue = formatCardNumber(e.target.value);
                      field.onChange(formattedValue);
                    }}
                    maxLength={19}
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {cardType && (
                    <span className="absolute right-3 top-2 text-sm font-medium capitalize">
                      {cardType}
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="MM/YY"
                      {...field}
                      onChange={(e) => {
                        const formattedValue = formatExpiryDate(e.target.value);
                        field.onChange(formattedValue);
                      }}
                      maxLength={5}
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="•••"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/gi, '');
                        field.onChange(value);
                      }}
                      maxLength={4}
                      className="pl-10"
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="saveCard"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Save card for future purchases</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <div className="text-sm text-gray-500 mb-4">
          <p className="flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            Your payment information is encrypted and secure
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
