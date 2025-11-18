import { useState, FormEvent } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="section-spacing bg-neutral-900 text-neutral-50">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Stay in the Loop
          </h2>
          <p className="text-lg text-neutral-300 mb-10">
            Subscribe to get special offers, exclusive drops, and the latest streetwear trends delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                className="bg-neutral-800 border-neutral-700 text-neutral-50 placeholder:text-neutral-400 focus:border-neutral-50"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
              className="bg-neutral-50 text-neutral-900 hover:bg-neutral-200 sm:w-auto"
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-sm text-neutral-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}

