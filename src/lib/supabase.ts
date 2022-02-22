import { createClient } from '@supabase/supabase-js';

const url = 'https://lwiwtjffusfxuxiyojvo.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aXd0amZmdXNmeHV4aXlvanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwODg2ODcsImV4cCI6MTk2MDY2NDY4N30.sBjh0Fqow1nM7uUURvDNsiXY5HqLhCR1wocXGS7Tet8';

const client = createClient(url, key);

export default client;
