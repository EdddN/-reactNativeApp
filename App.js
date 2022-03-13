import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';

import Navigators from './components/Navigator';

const queryClient = new QueryClient();

export default function App() {
   return (
   		<React.Fragment>
			<StatusBar style="auto" />
 <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
        <Navigators />
   </QueryClientProvider>
      </NativeBaseProvider>    
  </React.Fragment>
 ); 
} 