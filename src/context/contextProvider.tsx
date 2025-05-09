'use client';

import { solanaWeb3JsAdapter, projectId } from '../config/web3JsAdapters';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, solana, solanaDevnet, base } from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { env } from '../config/config';


// Set up metadata
const metadata = {
  name: 'Pump Tools',
  description: 'Pump Tools is a platform for creating and managing crypto tokens.',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// Create the modal
const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks: [solana, solanaDevnet],
  defaultNetwork: solana,
  metadata: metadata,
  features: {
    email: false,
    analytics: false,
    socials: []
  }
});

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  )
}

export default ContextProvider;