
import React from 'react';
import { Input } from '@/components/ui/input';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  return (
    <div className="mb-5">
      <label className="text-sm font-medium mb-1 block text-muted-foreground">
        Email Address
      </label>
      <Input
        type="email"
        placeholder="Enter email for report delivery"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="transition-all hover:border-primary/50 focus:border-primary"
      />
    </div>
  );
};

export default EmailInput;
