
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/UseProModal';


interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
};

export const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  };

  if (isPro) {
    return null
  };

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-5'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} FREE GENERATIONS
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
            <Button className='w-full' variant="premium" onClick={proModal.onOpen}>
              Upgrade
              <Zap className='w-4 h-4 ml-2 fill-white' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};
