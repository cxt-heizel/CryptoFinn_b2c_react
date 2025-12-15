import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '6자 이상 비밀번호를 입력해주세요'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
