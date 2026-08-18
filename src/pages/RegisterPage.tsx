import { useState, type SubmitEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { authApi } from '../api/authApi';
import { ApiClientError } from '../api/client';

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
}

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const mutation = useMutation({ mutationFn: authApi.register });

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (password.length < 12) {
            newErrors.password = 'Password must be at least 12 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        mutation.mutate({ email, password, fullName });
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 8,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#0E1116',
                }}
            >
                <Box
                    component="svg"
                    viewBox="0 0 850 850"
                    sx={{ position: 'absolute', top: -180, left: -230, width: 850, opacity: 0.5 }}
                >
                    <circle cx="425" cy="425" r="380" fill="none" stroke="#B8935A" strokeWidth="1.5" />
                    <circle cx="425" cy="425" r="285" fill="none" stroke="#B8935A" strokeWidth="1.5" />
                    <circle cx="425" cy="425" r="190" fill="none" stroke="#B8935A" strokeWidth="1.5" />
                    <circle cx="425" cy="425" r="7" fill="#B8935A" />
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <Typography sx={{ fontFamily: 'Georgia, serif', fontSize: 56, color: '#E8E6E0', mb: 3, lineHeight: 1.15 }}>
                        Your documents,<br />held in confidence.
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: '#9C978C', maxWidth: 500 }}>
                        Encrypted on your device before it ever reaches us.<br />We can't read what we can't see.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    bgcolor: '#171B21',
                    p: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto' }}>
                    <Typography sx={{ fontSize: 16, letterSpacing: '0.05em', color: '#B8935A', mb: 1.5 }}>
                        CUSTODIA
                    </Typography>
                    <Typography sx={{ fontFamily: 'Georgia, serif', fontSize: 38, color: '#E8E6E0', mb: 5 }}>
                        Create your account
                    </Typography>

                    {mutation.isError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {mutation.error instanceof ApiClientError
                                ? mutation.error.message
                                : 'Something went wrong'}
                        </Alert>
                    )}

                    {mutation.isSuccess && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Account created.
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                        <Box>
                            <Typography sx={{ fontSize: 14, color: '#9C978C', mb: 0.75 }}>Full name</Typography>
                            <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} error={!!errors.fullName} helperText={errors.fullName} fullWidth />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 14, color: '#9C978C', mb: 0.75 }}>Email</Typography>
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} fullWidth />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 14, color: '#9C978C', mb: 0.75 }}>Password</Typography>
                            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password || 'At least 12 characters'} fullWidth />
                        </Box>
                        <Button type="submit" variant="contained" disabled={mutation.isPending} sx={{ height: 60, mt: 1, fontSize: 18 }}>
                            {mutation.isPending ? 'Creating account…' : 'Register'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};