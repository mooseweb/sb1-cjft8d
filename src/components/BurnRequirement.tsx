import React from 'react';
import { Flame } from 'lucide-react';
import { REQUIRED_BURN_AMOUNT } from '../config/constants';

export function BurnRequirement() {
  return (
    <div className="bg-purple-900/30 rounded-lg p-4">
      <div className="flex items-center space-x-2 text-purple-300 mb-2">
        <Flame className="w-5 h-5" />
        <span>Burn Requirement:</span>
      </div>
      <p className="text-sm text-purple-200">
        {REQUIRED_BURN_AMOUNT} $SHIT tokens will be burned upon upload
      </p>
    </div>
  );
}