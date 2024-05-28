import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    AUTH_SERVICE_URL: z.string().url(),
    INVENTORY_SERVICE_URL: z.string().url(),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith('VITE_')) {
      acc[key.replace('VITE_', '')] = value;
    }
    return acc;
  }, {});

  // Log the environment variables before validation
  console.log('Environment Variables:', envVars);

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
