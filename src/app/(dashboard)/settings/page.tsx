"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Me } from "ordercloud-javascript-sdk";
import { z } from "zod";
import { DarkMode, DesktopWindows, LightMode, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useSnackbar } from "notistack";

import { useAuth } from "@/providers/auth-provider";
import { getErrorMessage } from "@/lib/ordercloud/errors";
import { FormTextField } from "@/components/form/form-text-field";
import { PageHeader } from "@/components/page-header";

const profileSchema = z.object({
  FirstName: z.string().min(1, "First name is required").max(100),
  LastName: z.string().min(1, "Last name is required").max(100),
  Email: z.email("Enter a valid email"),
  Phone: z.string().max(50).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function ProfileSettings() {
  const { user, setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      FirstName: user?.FirstName ?? "",
      LastName: user?.LastName ?? "",
      Email: user?.Email ?? "",
      Phone: user?.Phone ?? "",
    },
  });

  const saveProfile = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      Me.Save({
        Username: user?.Username ?? "",
        Active: user?.Active ?? true,
        ...values,
      }),
    onSuccess: (meUser) => {
      setUser(meUser);
      enqueueSnackbar("Profile saved", { variant: "success" });
    },
    onError: (error) => enqueueSnackbar(getErrorMessage(error), { variant: "error" }),
  });

  return (
    <Card>
      <CardHeader title="Profile" subheader={`Signed in as ${user?.Username}. Update your personal details below.`} />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit((values) => saveProfile.mutate(values))}
          sx={{ maxWidth: 480 }}
        >
          <Stack spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <FormTextField control={control} name="FirstName" label="First name" />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormTextField control={control} name="LastName" label="Last name" />
              </Grid>
            </Grid>
            <FormTextField control={control} name="Email" label="Email" type="email" />
            <FormTextField control={control} name="Phone" label="Phone" />
            <Button
              type="submit"
              variant="contained"
              disabled={saveProfile.isPending}
              sx={{ width: "fit-content" }}
              startIcon={saveProfile.isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
            >
              Save profile
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader title="Appearance" subheader="Choose how the admin dashboard looks." />
      <CardContent>
        <ToggleButtonGroup
          exclusive
          value={theme ?? "system"}
          onChange={(_, value) => value && setTheme(value)}
        >
          <ToggleButton value="light">
            <LightMode fontSize="small" sx={{ mr: 1 }} /> Light
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkMode fontSize="small" sx={{ mr: 1 }} /> Dark
          </ToggleButton>
          <ToggleButton value="system">
            <DesktopWindows fontSize="small" sx={{ mr: 1 }} /> System
          </ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <Stack spacing={2}>
      <PageHeader icon={Settings} title="Settings" description="Manage your profile and appearance preferences." color="primary" />
      <ProfileSettings />
      <AppearanceSettings />
    </Stack>
  );
}
