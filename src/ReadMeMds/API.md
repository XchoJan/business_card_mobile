# STR Mobile API Contract

Generated from the current Laravel project on 2026-06-04 by scanning routes, controllers, request validators, resources, repositories, models, middleware, enums, migrations, and README notes.

Audience: frontend/mobile developers and Cursor AI agents implementing API clients.

Primary source files:

- `routes/api.php`
- `routes/api/v1.php`
- `app/Http/Controllers/**`
- `app/Http/Requests/**`
- `app/Http/Resources/API/**`
- `app/Enums/**`
- `app/Http/Middleware/**`
- `app/Repositories/**`
- `app/Models/**`
- `bootstrap/app.php`

## Base Prefix

Base API path:

```text
/api/v1
```

If `APP_URL=http://str_mobile.test`, full local API URLs are:

```text
http://str_mobile.test/api/v1/...
```

Generated API docs are also registered:

```text
GET /docs/api
GET /docs/api.json
```

Recommended headers:

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer <access_token>
```

For authenticated routes, `Authorization: Bearer <access_token>` is preferred. `SetAuthorizationHeader` can also read a token from `token` query parameter, `token` body parameter, or `X-Access-Token` and inject a Bearer header, but frontend clients should not rely on those fallbacks unless required.

## Rate Limits

Rate limiting is disabled outside production.

Production limits:

| Group | Limit |
| --- | --- |
| `api` | 60 requests per minute per authenticated user ID or IP |
| `otp-sms` | 1 request per minute and 5 requests per day per authenticated user ID or IP |

Phone OTP send and verify routes use both `api` and `otp-sms`.

## Roles

API roles:

| Role | Meaning |
| --- | --- |
| `company` | Company client. Can manage cards, drivers, and vehicles. |
| `individual` | Individual client. Can manage cards and delete own client profile. |
| `driver` | Driver account. Has driver-specific user payload fields. |
| `super_admin` | Admin/web role, not intended for mobile API client features. |

Permissions returned on user resources can include:

```text
manage-vehicles
manage-drivers
manage-individual-segment-group
update-company-profile
delete-company-profile
update-individual-profile
delete-individual-profile
```

## Response Envelopes

Most routes use `App\Enums\APIResponse`.

```ts
interface ApiResponse<T> {
  status: number;
  code:
    | "AUTH_SUCCESS"
    | "AUTH_UNAUTHORIZED"
    | "AUTH_FORBIDDEN"
    | "RESOURCE_CREATED"
    | "RESOURCE_FETCHED"
    | "RESOURCE_UPDATED"
    | "RESOURCE_DELETED"
    | "RESOURCE_NOT_FOUND"
    | "RESOURCE_CONFLICT"
    | "VALIDATION_FAILED"
    | "RATE_LIMIT_EXCEEDED"
    | "SERVER_INTERNAL_ERROR"
    | "METHOD_NOT_ALLOWED"
    | "ROUTE_NOT_FOUND";
  message: string;
  data: T | null;
  timestamp: string; // ISO-8601 date-time
}
```

`POST /api/v1/login`, `POST /api/v1/refresh-token`, and `POST /api/v1/logout` use `ApiResponseResource` instead:

```ts
interface ResourceEnvelope<T> {
  data: T | null;
  message: string;
  status: number; // usually 200
  timestamp: string; // "YYYY-MM-DD HH:mm:ss"
}
```

Validation errors are wrapped by the global exception handler:

```json
{
  "status": 422,
  "code": "VALIDATION_FAILED",
  "message": "The provided data is invalid or poorly formatted.",
  "data": {
    "email": ["The email field is required."]
  },
  "timestamp": "2026-06-04T10:00:00+00:00"
}
```

Common errors:

| HTTP | Code | Data |
| --- | --- | --- |
| `401` | `AUTH_UNAUTHORIZED` | Exception message string |
| `403` | `AUTH_FORBIDDEN` | Current user or `null` |
| `404` | `ROUTE_NOT_FOUND` | Exception object/message |
| `405` | `METHOD_NOT_ALLOWED` | `null` |
| `422` | `VALIDATION_FAILED` | Validation error object |
| `429` | `RATE_LIMIT_EXCEEDED` | `null` |
| `500` | `SERVER_INTERNAL_ERROR` | Exception object/message |

Delete routes use `RESOURCE_DELETED` with HTTP `204`. HTTP 204 responses may have an empty body even when controller code passes data. Frontend clients must handle empty response bodies for delete operations.

## Shared Types

### Passport Tokens

Returned by the Laravel Passport password grant.

```ts
interface PassportTokens {
  token_type: string; // usually "Bearer"
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
```

### User

Returned by `UserResource`.

```ts
interface UserResource {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string;
  phone_number: string | null;
  role: "company" | "individual" | "driver" | "super_admin" | string | null;
  permissions: string[];
  alpha2?: string | null;
  client_type?: "company" | "individual" | null;
  reg_number?: string | null;
  company_name?: string | null;
  drivers?: unknown[] | null;
  vehicles?: unknown[] | null;
  vehicle?: unknown | null;
  created_at: string | null;
  updated_at: string | null;
}
```

For company users, `drivers` and `vehicles` may be raw Eloquent model arrays. Prefer the dedicated driver and vehicle endpoints for stable frontend shapes.

### Bank Card

Stable shape from `GET /api/v1/client/cards`.

```ts
interface BankCardResource {
  id: number;
  brand: string | null;
  is_default: boolean;
  card_number: string; // masked, e.g. "**** **** **** 1234"
  masked_expiration: string; // "MM/YYYY" or backend stored values
  last_four_digits: string;
  cardholder_name: string;
  expiration_year: string;
  expiration_month: string;
}
```

Create, update, and set-default card routes return raw `BankCard` model or boolean data in the current implementation, not always this resource.

### Client Driver

```ts
interface ClientDriverResource {
  id: number;
  email: string;
  vehicle: unknown | null;
  first_name: string;
  last_name: string;
  full_name: string;
  created_at: string | null; // "YYYY-MM-DD HH:mm:ss"
  updated_at: string | null;
}
```

### Client Vehicle

```ts
interface ClientVehicleResource {
  id: number;
  driver: unknown | null;
  vehicle_model: string;
  vehicle_fuel_capacity: string | number;
  vehicle_vin_unique_number: string;
  created_at: string | null; // "YYYY-MM-DD HH:mm:ss"
  updated_at: string | null;
}
```

### Country

```ts
interface CountryItem {
  title: string;
  alpha2: string;
  src: string; // full asset URL
}
```

### Phone Code

```ts
interface PhoneCodeItem {
  isd_code: string; // no plus sign, e.g. "374"
  alpha2: string; // e.g. "AM"
}
```

### Brand

```ts
interface BrandResource {
  id: number;
  name: string;
  src: string | null;
}
```

### Station Map Pin

```ts
interface StationMapResource {
  id: number;
  type: number;
  brand: BrandResource | null;
  is_available: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}
```

### Station Detail

```ts
interface StationResource {
  id: number;
  name: string;
  brand: BrandResource | null;
  address: string | null;
  type: number;
  is_available: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  supplier?: {
    id: number;
    name: string | null;
  } | null;
  network?: {
    id: number;
    name: string | null;
  } | null;
  pumps?: StationPumpResource[];
  services?: StationServiceResource[];
  payment_methods?: StationPaymentMethodResource[];
  metadata?: StationMetadataResource[];
}
```

### Station Metadata

`metadata` is curated supplier/API secondary information intended for station cards. Frontend clients can render the flat list directly by `sort_order`, or group rows by `section`.

```ts
interface StationMetadataResource {
  provider: string; // e.g. "gazprom", "monopoly"
  key: string; // stable machine key
  label: string; // display label
  value: string | null; // frontend-ready display value
  value_type: 'string' | 'boolean' | 'date' | 'phone' | 'list' | 'code' | string;
  section: string | null; // suggested card group
  icon: string | null; // optional frontend icon key
  sort_order: number;
  meta?: Record<string, unknown>;
}
```

### Station Pump

```ts
interface StationPumpResource {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  status: string | null;
  type: string | null;
  connection_type: string | null;
  services?: StationServiceResource[];
}
```

### Station Service

```ts
interface StationServiceResource {
  id: number;
  uuid: string;
  name: string;
  gas_station_id: string | null;
  goods_code: string | null;
  date_from: string | null; // ISO-8601 or null
  date_to: string | null; // ISO-8601 or null
}
```

### Station Payment Method

```ts
interface StationPaymentMethodResource {
  code: string;
  name: string;
}
```

### Station Price

Supplier-specific price lookup result.

```ts
interface StationPumpServicePrice {
  station_id: number;
  pump_id: number;
  service_id: number;
  supplier_station_id: string | number | null;
  supplier_pump_id: string | null;
  supplier_service_id: string | number | null;
  service_method: string | null;
  goods_code: string | null;
  name: string | null;
  price: number | null;
  retail_price: number | null;
  currency?: string | null;
  currency_code?: string | null;
  date_from: string | null;
  date_to: string | null;
}
```

## Public Routes

### POST /api/v1/login

Login with email and password.

Auth: public.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `email` | string | yes | Valid email |
| `password` | string | yes | Required |

Returns `200 ResourceEnvelope<LoginResponse>`.

```ts
interface LoginResponse {
  tokens: PassportTokens;
  user: UserResource;
}
```

Notes:

- `UserLoginRequest::authorize()` calls `Auth::attempt()`. Invalid credentials can return `403 AUTH_FORBIDDEN`, not `401`.
- Successful login uses the `ApiResponseResource` envelope, so there is no `code` field.

### POST /api/v1/refresh-token

Refresh an access token.

Auth: public.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `refresh_token` | string | yes | Required string |

Returns `200 ResourceEnvelope<{ tokens: PassportTokens }>` with message `Token refreshed successfully.`

### POST /api/v1/reset-password

Reset user password after OTP verification.

Auth: public.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `verified_otp_code` | string | yes | Must match an already verified OTP code record |
| `email` | string | yes | Valid email and must exist in `users.email` |
| `password` | string | yes | Required string, `max:8`, confirmed |
| `password_confirmation` | string | yes | Must match `password` |

Returns `200 ApiResponse<{ tokens: PassportTokens; user: UserResource }>` with `code: "RESOURCE_UPDATED"`.

Implementation note: password validation is currently `max:8`, not `min:8`.

### POST /api/v1/register

Register a company or individual client. This route is public but requires a verified OTP for the same `device_id` and target.

Middleware:

- `HasUserVerifiedOtpMiddleware`
- `HasSameOtpTargetMiddleware`

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `device_id` | string | yes | Required by middleware; max 255 if validated by request |
| `password` | string | yes | Required string, max 255 |
| `client_type` | string | yes | Enum: `company`, `individual` |
| `name` | string | no by validator | String, max 255 |
| `last_name` | string | no by validator | String, max 255 |
| `alpha2` | string | no by validator | Size 2, must exist as country `alpha2` or `alpha3` |
| `email` | string | no by validator | Email, max 255, unique in users |
| `phone_number` | string | conditional for phone OTP flow | Middleware uses it when registration follows phone OTP |
| `reg_number` | string or null | required for `company` | String, max 255, nullable |
| `company_name` | string or null | required for `company` | String, max 255, prohibited when `client_type` is not `company` |

Returns `201 ApiResponse<RegisterResponse>` with `code: "RESOURCE_CREATED"`.

```ts
interface RegisterResponse {
  tokens: PassportTokens;
  user: UserResource;
}
```

OTP target rules:

- If the verified OTP is email-based, request `email` must match the verified OTP target.
- If the verified OTP is phone-based, request `phone_number` must match the verified OTP target.
- `device_id` must have at least one verified OTP record.

Implementation notes:

- The validator does not require `email`, `name`, `last_name`, or `alpha2`, but successful account creation and token issuance practically require a valid `email` and useful identity fields.
- `phone_number` can satisfy middleware for phone OTP, but the current registration service does not save it to the user.

### POST /api/v1/otp/email/send

Send an email OTP.

Auth: public.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `device_id` | string | yes | Required |
| `target` | string | yes | Email, RFC and DNS validation |

Returns `201 ApiResponse<null>` with message `OTP has been sent to your email.`

The OTP code is stored asynchronously by `SendUserVerificationListener` and queued to email. Email OTP expiration defaults to 10 minutes.

### POST /api/v1/otp/email/verify

Verify an email OTP.

Auth: public.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `code` | string | yes | Required |
| `device_id` | string | yes | Required |

Returns `200 ApiResponse<OtpVerifyData>` with `code: "RESOURCE_UPDATED"` on success.

```ts
interface OtpVerifyData {
  verification_code: null;
  verified_at: string;
  verification_expires_at: null;
}
```

Error cases:

- Already verified OTP: `422 VALIDATION_FAILED`
- No OTP for device/code/type: `404 RESOURCE_NOT_FOUND`
- Expired or invalid OTP: `422 VALIDATION_FAILED`

### POST /api/v1/otp/phone/send

Send a phone OTP by SMS.

Auth: public.

Rate limit: production `otp-sms`.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `device_id` | string | yes | Required |
| `phone_number` | string | yes | Numeric, digits between 8 and 10 |
| `phone_code` | string | yes | Must exist in countries `isd_code`, no plus sign |
| `country_code` | string | yes | Must exist as countries `alpha2` or `alpha3` |

Additional match validation:

| Country | `country_code` | `phone_code` | `phone_number` length |
| --- | --- | --- | --- |
| Armenia | `AM` | `374` | 8 or 9 digits |
| Russia | `RU` | `7` | 10 digits |
| Kyrgyzstan | `KG` | `996` | 10 digits |

Returns SMS-provider-dependent `ApiResponse`.

Expected success:

```ts
ApiResponse<unknown | null>
```

OTP is stored only when the SMS provider response status equals `201`.

### POST /api/v1/otp/phone/verify

Verify a phone OTP.

Auth: public.

Rate limit: production `otp-sms`.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `code` | string | yes | Required |
| `device_id` | string | yes | Required |

Returns the same success and error shapes as `POST /api/v1/otp/email/verify`, but with `target_type: "phone"` internally.

### GET /api/v1/stations

Return station map pins.

Auth: public.

Query:

| Field | Type | Required | Validation | Default |
| --- | --- | --- | --- | --- |
| `north_east_lat` | number | no | Required after defaulting, numeric, between -90 and 90 | `90` |
| `south_west_lat` | number | no | Required after defaulting, numeric, between -90 and 90 | `-90` |
| `north_east_lng` | number | no | Required after defaulting, numeric, between -180 and 180 | `180` |
| `south_west_lng` | number | no | Required after defaulting, numeric, between -180 and 180 | `-180` |
| `limit` | integer | no | Min 1, max 1000 | none |
| `offset` | integer | no | Min 0 | none |

Returns `200 ApiResponse<StationMapResource[]>`.

Notes:

- The request class comment says south-west values must be lower than north-east values, but the repository normalizes with `min()` and `max()`. The current validator does not enforce coordinate ordering.
- If no bounds are sent, global bounds are used.

### GET /api/v1/stations/{id}

Return station details.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Station ID; model must exist |

Returns `200 ApiResponse<StationResource>`.

Loaded relations: `supplier`, `brandModel`, `publicMetadata`.

### GET /api/v1/stations/{id}/pumps

Return pumps for a station.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Station ID; model must exist |

Returns `200 ApiResponse<StationPumpResource[]>`.

Pump `services` are included because the repository loads `services`.

### GET /api/v1/stations/{id}/services

Return services for a station.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Station ID; model must exist |

Returns `200 ApiResponse<StationServiceResource[]>`.

### GET /api/v1/stations/{id}/payment_methods

Return payment methods for a station.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Station ID; model must exist |

Returns `200 ApiResponse<StationPaymentMethodResource[]>`.

### GET /api/v1/stations/{id}/{pump}/{service}/price

Return a supplier price for a station pump and service.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Station ID; model must exist |
| `pump` | string | yes | Pump UUID or numeric pump ID belonging to station |
| `service` | string | yes | Service UUID or numeric service ID belonging to station |

Returns `200 ApiResponse<StationPumpServicePrice>`.

Error cases:

- Station not found: `404 ROUTE_NOT_FOUND`
- Pump not found: `404 ROUTE_NOT_FOUND`
- Service not found: `404 ROUTE_NOT_FOUND`
- Service not linked to pump: `404 ROUTE_NOT_FOUND`
- Station supplier missing or unsupported: `500 SERVER_INTERNAL_ERROR` or bad request exception wrapped by the global handler

### GET /api/v1/translations/{lang?}

Return application translations.

Auth: public.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `lang` | string | no | Language key, for example `en`, `ru`, `am` |

Returns `200 ApiResponse<Record<string, unknown>>`.

Behavior:

- If `lang` is provided and exists in a language line text array, returns only that language value.
- If `lang` is missing or unavailable for a key, returns the full `text` array for that key.
- Keys are expanded into nested objects with `Arr::set()`.

## Authenticated Reference and Profile Routes

All routes in this section require:

```http
Authorization: Bearer <access_token>
```

### GET /api/v1/user-information

Return the current authenticated user.

Auth: `auth:api`.

Returns `200 ApiResponse<{ user: UserResource }>` with `code: "RESOURCE_FETCHED"`.

### POST /api/v1/logout

Revoke the current access token and its refresh token.

Auth: `auth:api`.

Body: none.

Returns `200 ResourceEnvelope<null>` with message `Logged out successfully.`

Uses `ApiResponseResource`, so there is no `code` field.

### POST /api/v1/update-user-information

Update current user basic information.

Auth: `auth:api`.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `name` | string | yes | Required |
| `lastname` | string | yes | Required |

Returns `200 ApiResponse<{ user: UserResource }>` with `code: "RESOURCE_UPDATED"`.

Implementation note: the `users` table/model uses `name`; `lastname` is validated but not fillable on `User`, and `UserResource` reads first/last name from `client` or `driver`, not from `users.name`. Frontend should verify behavior before depending on this route for profile editing.

### GET /api/v1/countries

Return countries.

Auth: `auth:api`.

Returns `200 ApiResponse<CountryItem[]>`.

### GET /api/v1/phone-codes

Return supported phone codes.

Auth: `auth:api`.

Returns `200 ApiResponse<PhoneCodeItem[]>`.

Only countries whose `alpha2` is in `AM`, `RU`, `KG` are returned.

### GET /api/v1/client-types

Return client type labels.

Auth: `auth:api`.

Returns `200 ApiResponse<Record<string, string>>`.

Current repository implementation filters out `individual`, so expected data is likely:

```ts
Record<"company", string>
```

Registration validation still accepts both `company` and `individual`.

### GET /api/v1/role-types

Return API roles.

Auth: `auth:api`.

Intended return: `200 ApiResponse<unknown>`.

Current implementation warning: `AuthController@getRoleTypes()` calls `UserRepository::getRolesByGuardName('api')`, but that method is not present in the scanned repository. This endpoint is likely to return `500 SERVER_INTERNAL_ERROR` until implemented.

## Client Profile Routes

### DELETE /api/v1/client/delete

Delete the authorized client account.

Auth: `auth:api`.

Roles: `company` or `individual`.

Body: none.

Returns HTTP `204` with possible empty body.

Implementation attempts to return deleted client data, but frontend must handle no response body.

## Bank Card Routes

All routes in this section require `auth:api` and role `company` or `individual`.

### GET /api/v1/client/cards

Return current user's bank cards.

Returns `200 ApiResponse<BankCardResource[]>`.

### POST /api/v1/client/cards/create

Create a bank card.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `gateway_name` | string | yes | Required, string, max 255 |
| `cardholder_name` | string | yes | Required, string, max 255 |
| `cvc` | string | yes | Valid for `card_number` by LVR credit-card rule |
| `card_number` | string | yes | Required, unique in `bank_cards.card_number`, valid card number |
| `expiration_year` | string | yes | Valid expiration year by LVR rule |
| `expiration_month` | string | yes | Valid expiration month by LVR rule |

Authorization rule:

- User must be authenticated and have a client record.

Returns `200 ApiResponse<RawBankCard>` with `code: "RESOURCE_FETCHED"`.

The route returns raw `BankCard` model, not `BankCardResource`. The raw model hides `card_number`, but may include decrypted `cardholder_name`, `expiration_year`, and `expiration_month`.

### PUT /api/v1/client/cards/update/{id}

Update a bank card.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Bank card ID |

Body: same as create card, all fields required.

Returns `200 ApiResponse<boolean>` with `code: "RESOURCE_UPDATED"`.

Implementation notes:

- The unique `card_number` validation does not ignore the current card ID, so sending the same card number on update can fail validation.
- The repository method used here returns a boolean update result, not the updated card.

### DELETE /api/v1/client/cards/delete/{id}

Delete a bank card.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Bank card ID |

Returns HTTP `204`; handle empty body.

### PUT /api/v1/client/cards/set-default/{id}

Set a bank card as default.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | integer | yes | Bank card ID |

Body: none.

Returns `200 ApiResponse<RawBankCard>` with `code: "RESOURCE_UPDATED"`.

When a card is saved as default, the model resets other cards for the same user to `is_default: false`.

## Company Driver Routes

All routes in this section require `auth:api` and role `company`.

### GET /api/v1/client/drivers

Return company drivers.

Returns `200 ApiResponse<ClientDriverResource[]>`.

### POST /api/v1/client/drivers/create

Create a driver user under the authenticated company client.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `first_name` | string | yes | Required on create, string, max 255 |
| `last_name` | string | yes | Required on create, string, max 255 |
| `email` | string | yes | Required on create, email, max 255, unique in `users.email` |
| `password` | string | yes | Required on create, string, min 8 |
| `client_vehicle_id` | string or null | no | Nullable; accepted by validator |

Authorization rule:

- User must be authenticated and have a client record.

Returns `201 ApiResponse<ClientDriverResource>` with `code: "RESOURCE_CREATED"`.

Implementation note: `client_vehicle_id` is accepted by the request validator but is not used by `createDriver()` when creating the driver.

### PUT /api/v1/client/drivers/update/{id}

Update a company driver.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Driver ID under current company client |

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `first_name` | string | no | Sometimes, string, max 255 |
| `last_name` | string | no | Sometimes, string, max 255 |
| `email` | string | no | Sometimes, email, max 255, unique in users ignoring this driver user's ID |
| `password` | string or null | no | Nullable, string, min 8 |
| `client_vehicle_id` | string or null | no | Nullable |

Returns `201 ApiResponse<RawClientDriver>` with `code: "RESOURCE_CREATED"` even though this is an update.

Implementation warning: if `client_vehicle_id` is omitted, repository code sets it to `null`, which detaches the driver from a vehicle.

### DELETE /api/v1/client/drivers/delete/{id}

Delete a company driver.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Driver ID under current company client |

Returns HTTP `204`; handle empty body.

### PUT /api/v1/client/drivers/attache-driver/{id}

Attach a driver to a vehicle.

Route name contains `attache-driver` as implemented.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Driver ID under current company client |

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `client_vehicle_id` | integer | yes | Required for attach, must exist in `client_vehicles.id` |

Additional validation:

- The route driver ID must exist under the authorized client.

Returns `200 ApiResponse<RawClientDriver>` with `code: "RESOURCE_UPDATED"`.

### PUT /api/v1/client/drivers/detach-driver/{id}

Detach a driver from its vehicle.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Driver ID under current company client |

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `client_vehicle_id` | integer | no | If sent, must exist in `client_vehicles.id`; ignored by controller |

Additional validation:

- The route driver ID must exist under the authorized client.

Returns `200 ApiResponse<RawClientDriver>` with `code: "RESOURCE_UPDATED"`.

Recommended frontend behavior: send an empty JSON body or no body.

## Company Vehicle Routes

All routes in this section require `auth:api` and role `company`.

### GET /api/v1/client/vehicles

Return company vehicles.

Returns `200 ApiResponse<ClientVehicleResource[]>`.

### POST /api/v1/client/vehicles/create

Create a company vehicle.

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `vehicle_model` | string | yes | Required on create, max 255 |
| `vehicle_fuel_capacity` | number | yes | Required on create, numeric, max 255 |
| `vehicle_vin_unique_number` | string | yes | Required on create, unique in `client_vehicles.vehicle_vin_unique_number`, max 255 |

Authorization rule:

- User must be authenticated and have a client record.

Returns `201 ApiResponse<RawClientVehicle>` with `code: "RESOURCE_CREATED"`.

### PUT /api/v1/client/vehicles/update/{id}

Update a company vehicle.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Vehicle ID under current company client |

Body:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `vehicle_model` | string | no | Sometimes, max 255 |
| `vehicle_fuel_capacity` | number | no | Sometimes, numeric, max 255 |
| `vehicle_vin_unique_number` | string | no | Sometimes, unique ignoring route ID, max 255 |

Returns `201 ApiResponse<RawClientVehicle | null>` with `code: "RESOURCE_CREATED"` even though this is an update.

### DELETE /api/v1/client/vehicles/delete/{id}

Delete a company vehicle.

Path parameters:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `id` | string/integer | yes | Vehicle ID under current company client |

Returns HTTP `204`; handle empty body.

## Internal or Debug API Routes

These routes are registered under `/api/v1`, but they are not stable frontend integration endpoints.

### GET /api/v1/discount-calculate

Auth: `auth:api`.

Body/query: none.

Current behavior:

- Calls `$discountService->getDiscountId('monopoly')`.
- Does not return an explicit response.

Frontend should not depend on this route until a response contract is implemented.

### POST /api/v1/test1

Auth: no `auth:api` middleware is registered.

Current behavior:

- Reads `Auth::user()->client`.
- Calls `WalletService::adminDeposit($client->id, -5000)`.
- Returns raw string `true`.

Frontend should not call this route. It can throw a server error when unauthenticated and mutates wallet balance.

## Non-v1 Documentation Routes

### GET /docs/api

Scramble documentation UI.

Auth: web middleware. Restricted docs access middleware is commented out in config.

### GET /docs/api.json

Scramble OpenAPI JSON.

Auth: web middleware. Restricted docs access middleware is commented out in config.

## Frontend Integration Flow

Recommended registration flow:

1. Collect email or phone target plus `device_id`.
2. Send OTP with `POST /api/v1/otp/email/send` or `POST /api/v1/otp/phone/send`.
3. Verify OTP with matching verify route.
4. Register with the same `device_id` and same target field (`email` or `phone_number`) used for OTP.
5. Store `data.tokens.access_token` and `data.tokens.refresh_token`.
6. Use `Authorization: Bearer <access_token>` for protected calls.
7. On token expiry, call `POST /api/v1/refresh-token` and replace both tokens.

Recommended authenticated bootstrap flow:

1. `POST /api/v1/login`
2. `GET /api/v1/user-information`
3. Use `role` and `permissions` from `user` to show role-specific screens.
4. For company users, fetch `/client/vehicles` and `/client/drivers` separately instead of relying on nested raw `drivers` and `vehicles` in `UserResource`.

## Known Implementation Warnings

These are not frontend requirements, but they affect integration:

- `GET /api/v1/role-types` is likely broken because `UserRepository::getRolesByGuardName()` is missing.
- `POST /api/v1/update-user-information` validates `lastname`, but the user model does not fill that field and user resource names come from client or driver relations.
- Driver update can detach a vehicle if `client_vehicle_id` is omitted.
- Bank card update requires all create fields and the unique card rule does not ignore the current card.
- Several update routes return `201 RESOURCE_CREATED` instead of `200 RESOURCE_UPDATED`.
- Some create/update routes return raw Eloquent models instead of the matching API Resource.
- Delete routes should be treated as empty `204` responses.
- Public country and client-type lookup routes are not available; current `/countries`, `/phone-codes`, and `/client-types` are authenticated.
- `POST /api/v1/test1` is a mutating debug route and should not be used by frontend clients.
