import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

function SectionHeading({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="border-b border-gray-200 pb-4">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
        </div>
    );
}

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;
    const u = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile Settings</h1>

            <SettingsLayout>
                <Form
                    method={ProfileController.update().method}
                    action={ProfileController.update().url}
                    options={{ preserveScroll: true }}
                    className="space-y-10"
                >
                    {({ processing, recentlySuccessful, errors }) => (
                        <>
                            {/* ── Basic Information ── */}
                            <div className="space-y-5">
                                <SectionHeading
                                    title="Basic Information"
                                    description="Your name, email and personal details"
                                />

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={u.name}
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        defaultValue={u.email}
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    u.email_verified_at === null && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline underline-offset-4 hover:decoration-current!"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>
                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        defaultValue={(u.phone as string) ?? ''}
                                        autoComplete="tel"
                                        placeholder="+1 234 567 8900"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.phone}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="date_of_birth">
                                            Date of Birth
                                        </Label>
                                        <Input
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            defaultValue={
                                                (u.date_of_birth as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.date_of_birth}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            defaultValue={
                                                (u.gender as string) ?? ''
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="">
                                                Prefer not to say
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                            <option value="other">Other</option>
                                            <option value="prefer_not_to_say">
                                                Rather not say
                                            </option>
                                        </select>
                                        <InputError
                                            className="mt-1"
                                            message={errors.gender}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── Billing Address ── */}
                            <div className="space-y-5">
                                <SectionHeading title="Billing Address" />

                                <div className="grid gap-2">
                                    <Label htmlFor="billing_name">
                                        Billing Name
                                    </Label>
                                    <Input
                                        id="billing_name"
                                        name="billing_name"
                                        defaultValue={
                                            (u.billing_name as string) ?? ''
                                        }
                                        placeholder="Name on invoice"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.billing_name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="billing_address">
                                        Address
                                    </Label>
                                    <Input
                                        id="billing_address"
                                        name="billing_address"
                                        defaultValue={
                                            (u.billing_address as string) ?? ''
                                        }
                                        placeholder="123 Main St"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.billing_address}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_city">
                                            City
                                        </Label>
                                        <Input
                                            id="billing_city"
                                            name="billing_city"
                                            defaultValue={
                                                (u.billing_city as string) ?? ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.billing_city}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_state">
                                            State / Region
                                        </Label>
                                        <Input
                                            id="billing_state"
                                            name="billing_state"
                                            defaultValue={
                                                (u.billing_state as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.billing_state}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_country">
                                            Country
                                        </Label>
                                        <Input
                                            id="billing_country"
                                            name="billing_country"
                                            defaultValue={
                                                (u.billing_country as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.billing_country}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_postcode">
                                            Postcode / ZIP
                                        </Label>
                                        <Input
                                            id="billing_postcode"
                                            name="billing_postcode"
                                            defaultValue={
                                                (u.billing_postcode as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.billing_postcode}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── Shipping Address ── */}
                            <div className="space-y-5">
                                <SectionHeading
                                    title="Shipping Address"
                                    description="Used to pre-fill order forms"
                                />

                                <div className="grid gap-2">
                                    <Label htmlFor="shipping_name">
                                        Recipient Name
                                    </Label>
                                    <Input
                                        id="shipping_name"
                                        name="shipping_name"
                                        defaultValue={
                                            (u.shipping_name as string) ?? ''
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.shipping_name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="shipping_address">
                                        Address
                                    </Label>
                                    <Input
                                        id="shipping_address"
                                        name="shipping_address"
                                        defaultValue={
                                            (u.shipping_address as string) ?? ''
                                        }
                                        placeholder="123 Main St"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.shipping_address}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="shipping_city">
                                            City
                                        </Label>
                                        <Input
                                            id="shipping_city"
                                            name="shipping_city"
                                            defaultValue={
                                                (u.shipping_city as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.shipping_city}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="shipping_state">
                                            State / Region
                                        </Label>
                                        <Input
                                            id="shipping_state"
                                            name="shipping_state"
                                            defaultValue={
                                                (u.shipping_state as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.shipping_state}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="shipping_country">
                                            Country
                                        </Label>
                                        <Input
                                            id="shipping_country"
                                            name="shipping_country"
                                            defaultValue={
                                                (u.shipping_country as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.shipping_country}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="shipping_postcode">
                                            Postcode / ZIP
                                        </Label>
                                        <Input
                                            id="shipping_postcode"
                                            name="shipping_postcode"
                                            defaultValue={
                                                (u.shipping_postcode as string) ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            className="mt-1"
                                            message={errors.shipping_postcode}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── Preferences ── */}
                            <div className="space-y-5">
                                <SectionHeading title="Preferences" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="preferred_currency">
                                            Preferred Currency
                                        </Label>
                                        <select
                                            id="preferred_currency"
                                            name="preferred_currency"
                                            defaultValue={
                                                (u.preferred_currency as string) ??
                                                'USD'
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="USD">
                                                USD – US Dollar
                                            </option>
                                            <option value="EUR">
                                                EUR – Euro
                                            </option>
                                            <option value="GBP">
                                                GBP – British Pound
                                            </option>
                                            <option value="AUD">
                                                AUD – Australian Dollar
                                            </option>
                                            <option value="CAD">
                                                CAD – Canadian Dollar
                                            </option>
                                        </select>
                                        <InputError
                                            className="mt-1"
                                            message={errors.preferred_currency}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="preferred_language">
                                            Preferred Language
                                        </Label>
                                        <select
                                            id="preferred_language"
                                            name="preferred_language"
                                            defaultValue={
                                                (u.preferred_language as string) ??
                                                'en'
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="en">English</option>
                                            <option value="fr">French</option>
                                            <option value="es">Spanish</option>
                                            <option value="de">German</option>
                                            <option value="zh">Chinese</option>
                                        </select>
                                        <InputError
                                            className="mt-1"
                                            message={errors.preferred_language}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center gap-3 text-sm">
                                        <input
                                            type="checkbox"
                                            name="newsletter_subscribed"
                                            defaultChecked={
                                                !!u.newsletter_subscribed
                                            }
                                            value="1"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        Subscribe to newsletter
                                    </label>
                                    <label className="flex items-center gap-3 text-sm">
                                        <input
                                            type="checkbox"
                                            name="marketing_opt_in"
                                            defaultChecked={
                                                !!u.marketing_opt_in
                                            }
                                            value="1"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        Receive marketing communications
                                    </label>
                                </div>
                            </div>

                            {/* ── Save Button ── */}
                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Save Changes
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Saved
                                    </p>
                                </Transition>
                            </div>
                        </>
                    )}
                </Form>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}

