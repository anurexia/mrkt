"use client";

import { ReactNode, useActionState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type State, updateUserSettings } from "@/app/actions";
import { toast } from "sonner";

interface SettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm = ({ email, firstName, lastName }: SettingsFormProps) => {
  const initialState: State = {
    status: undefined,
    message: "",
  };

  const [state, formAction] = useActionState(updateUserSettings, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Take a look at your account settings</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <ContentWrapper>
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
        </ContentWrapper>

        <ContentWrapper>
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
        </ContentWrapper>

        <ContentWrapper>
          <Label>Email</Label>
          {/* we're only allowing the user to see the email, but not update it */}
          <Input name="email" type="email" disabled defaultValue={email} />
        </ContentWrapper>
      </CardContent>

      <CardFooter>
        <SubmitButton title="Update Settings" />
      </CardFooter>
    </form>
  );
};

export default SettingsForm;

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-y-2">{children}</div>;
};
