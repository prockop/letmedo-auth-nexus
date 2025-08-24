import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  CircularProgress,
  useTheme,
  alpha
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person,
  Lock,
  Google,
  Facebook
} from "@mui/icons-material";

// Validation schemas
const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const signInSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AuthForm = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const onSignUpSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Sign up data:", data);
      // Success handling would go here
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Sign in data:", data);
      // Success handling would go here
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login would be handled here`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.default, 1)} 50%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        p: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 440,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
            Welcome to letmedo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect with local service providers or offer your skills to others
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>

        {/* Sign In Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box component="form" onSubmit={signInForm.handleSubmit(onSignInSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email or Phone"
              type="text"
              {...signInForm.register("emailOrPhone")}
              error={!!signInForm.formState.errors.emailOrPhone}
              helperText={signInForm.formState.errors.emailOrPhone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...signInForm.register("password")}
              error={!!signInForm.formState.errors.password}
              helperText={signInForm.formState.errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>
        </TabPanel>

        {/* Sign Up Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box component="form" onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} noValidate>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...signUpForm.register("firstName")}
                  error={!!signUpForm.formState.errors.firstName}
                  helperText={signUpForm.formState.errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...signUpForm.register("lastName")}
                  error={!!signUpForm.formState.errors.lastName}
                  helperText={signUpForm.formState.errors.lastName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...signUpForm.register("email")}
              error={!!signUpForm.formState.errors.email}
              helperText={signUpForm.formState.errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Mobile / Phone"
              {...signUpForm.register("phone")}
              error={!!signUpForm.formState.errors.phone}
              helperText={signUpForm.formState.errors.phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...signUpForm.register("password")}
              error={!!signUpForm.formState.errors.password}
              helperText={signUpForm.formState.errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...signUpForm.register("confirmPassword")}
              error={!!signUpForm.formState.errors.confirmPassword}
              helperText={signUpForm.formState.errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Box>
        </TabPanel>

        {/* Social Login */}
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
                sx={{ py: 1.2 }}
              >
                Google
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading}
                sx={{ py: 1.2 }}
              >
                Facebook
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Legal Text */}
        <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
          By proceeding, I agree to letmedo's{" "}
          <Link href="#" underline="hover" color="primary">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link href="#" underline="hover" color="primary">
            Community Guidelines
          </Link>
          , &{" "}
          <Link href="#" underline="hover" color="primary">
            Privacy Policy
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default AuthForm;