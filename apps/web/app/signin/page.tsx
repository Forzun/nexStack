"use client";
import { cn } from "@workspace/ui/lib/utils"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().email("Invaild email address"),
    password: z.string().min(5, "password must be at least 8 character").max(20, "Password must be less then 20"),
    confirmPassword: z.optional(z.string())
})

export default function SignupPage() {
    const router = useRouter();
    const { userError, loading, Login } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const { username, password } = data
            const response = await Login(username, password);

            if (response) {
                toast.success(response.message)
                router.push("/dashboard")
            }
            console.log("here", password)
            console.log(username, password)
        } catch (error) {
            toast.error(JSON.stringify(userError));
        }

    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-4xl">
                        <div className={cn("flex flex-col gap-6")}>
                            <Card className="overflow-hidden p-0">
                                <CardContent className="grid p-0 md:grid-cols-2">
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                        <FieldGroup>
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <h1 className="text-2xl font-bold">Sign up with your accound</h1>
                                                <p className="text-muted-foreground text-sm text-balance">
                                                    Enter your email below to enter in your account
                                                </p>
                                            </div>
                                            <Controller
                                                name="username"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field>
                                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                                        <Input
                                                            {...field}
                                                            id="email"
                                                            type="email"
                                                            placeholder="m@example.com"
                                                            required
                                                            aria-invalid={fieldState.invalid}
                                                            autoComplete="off"
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                        <FieldDescription className="border-none">
                                                            We&apos;ll use this to contact you. We will not share your
                                                            email with anyone else.
                                                        </FieldDescription>
                                                    </Field>
                                                )}
                                            />
                                            <Field>

                                                <Field className="grid grid-cols gap-4">
                                                    <Controller
                                                        name="password"
                                                        control={form.control}
                                                        render={({ field, fieldState }) => (
                                                            <Field>
                                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                                <Input
                                                                    {...field}
                                                                    aria-invalid={fieldState.invalid}
                                                                    autoComplete="off"
                                                                    id="password" type="password" required />
                                                                {fieldState.error && (
                                                                    <FieldError errors={[fieldState.error]} />
                                                                )}
                                                            </Field>
                                                        )}
                                                    />
                                                </Field>
                                                <FieldDescription className="border-none">
                                                    Must be at least 8 characters long.
                                                </FieldDescription>
                                            </Field>
                                            <Field>
                                                <Button disabled={loading} className="flex items-center justify-center gap-2" type="submit">{loading && <span><Loader2 className="w-4 h-4 animate-spin transition-all ease-in duration-300" /></span>} Create Account</Button>
                                            </Field>
                                            <span className="text-center text-muted-foreground">
                                                Or continue with
                                            </span>
                                            <Field className="grid grid-cols-1 gap-3">
                                                <Button variant="outline" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <path
                                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Sign up with Apple</span>
                                                </Button>
                                            </Field>
                                            <FieldDescription className="text-center border-none">
                                                Already have an account? <a href="/signup">Sign Up</a>
                                            </FieldDescription>
                                        </FieldGroup>
                                    </form>
                                    <div className="bg-muted relative hidden md:block">
                                        <img
                                            src="https://i.pinimg.com/736x/89/17/71/891771d3a7046ca3c03ed2d9405c2a0a.jpg"
                                            alt="Image"
                                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <FieldDescription className="px-6 text-center border-none">
                                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                                and <a href="#">Privacy Policy</a>.
                            </FieldDescription>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
