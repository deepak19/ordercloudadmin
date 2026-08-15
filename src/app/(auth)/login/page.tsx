"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import { useAuth } from "@/providers/auth-provider";
import { getErrorMessage } from "@/lib/ordercloud/errors";
import { BRANDS, DEFAULT_BRAND_ID, getBrand } from "@/config/brands";
import { useThemeBrandPreview } from "@/providers/theme-brand-provider";
import { FormTextField } from "@/components/form/form-text-field";

const loginSchema = z.object({
  brandId: z.string().min(1, "Select a brand"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const setPreviewBrand = useThemeBrandPreview();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, router]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { brandId: DEFAULT_BRAND_ID, username: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    try {
      await login(values.brandId, values.username, values.password);
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  return (
    <Card sx={{ width: "100%", maxWidth: 400 }}>
      <CardHeader
        title="Sign in"
        subheader="Select your brand and enter your OrderCloud admin credentials to continue."
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            {serverError && <Alert severity="error">{serverError}</Alert>}

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Brand
              </Typography>
              <Controller
                control={control}
                name="brandId"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPreviewBrand(getBrand(e.target.value) ?? null);
                    }}
                    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
                  >
                    {BRANDS.map((brand) => (
                      <FormControlLabel
                        key={brand.id}
                        value={brand.id}
                        control={<Radio size="small" />}
                        sx={{ border: 1, borderColor: "divider", borderRadius: 1, mx: 0, px: 1 }}
                        label={
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: brand.theme.light.primary,
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2">{brand.name}</Typography>
                          </Stack>
                        }
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.brandId && (
                <FormHelperText error>{errors.brandId.message}</FormHelperText>
              )}
            </Box>

            <FormTextField
              control={control}
              name="username"
              label="Username"
              autoComplete="username"
            />
            <FormTextField
              control={control}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
