import { Controller, useForm, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { COUNTRIES } from "@/config/constants";
import CountryFlag from "./CountryFlag";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUser } from "@/contexts/UserContext";

type UpdateUserForm = {
  username: string;
  country: string;
};

// TODO: Study this - good generics example - probably?
type ValidationSchema<T extends FieldValues> = {
  [K in Path<T>]?: RegisterOptions<T, K>;
};

const validations: ValidationSchema<UpdateUserForm> = {
  username: {
    required: "Please enter your username",
    minLength: {
      value: 3,
      message: "Minimum 3 characters needed",
    },
    maxLength: {
      value: 12,
      message: "Maximum 10 characters allowed",
    },
  },
  country: {
    required: "Please select a country",
  },
};

const UpdateUserIdCountry = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserForm>();

  const {logout} = useUser()

  const onUpdateUser = (data: UpdateUserForm) => {
    console.log(data);
  };
  return (
    <form className="update-user-form mt-2 w-[50%] min-w-[300px]" onSubmit={handleSubmit(onUpdateUser)}>
      <Input placeholder="Username" className="w-full" {...register("username", validations.username)} aria-invalid={errors.username ? "true" : "false"} />
      {errors.username && <div className="text-[10px] text-red-600 mt-1 w-full">{errors.username.message}</div>}
      {/* <Input placeholder="Password" type="password" className="mt-2" {...register("country", validations.country)} aria-invalid={errors.country ? "true" : "false"} />
      {errors.country && <div className="text-[10px] text-red-600 mt-1 w-full">{errors.country.message}</div>} */}
      {/* TODO - Change the below list to a faster one */}
      <Controller
        name="country"
        control={control}
        rules={validations.country}
        render={({ field }) => {
          const selectedCountry = COUNTRIES.find((c) => c.value === field.value);
          return (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger aria-invalid={errors.country ? "true" : "false"} className="mt-2 flex items-center gap-2">
                {selectedCountry ? (
                  <>
                    <CountryFlag code={selectedCountry.value} className="w-5 h-5 inline-block" />
                    <span>{selectedCountry.label}</span>
                  </>
                ) : (
                  <SelectValue placeholder="Select a country" />
                )}
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value} className="flex items-center gap-2">
                    <CountryFlag code={country.value} className="w-5 h-5 inline-block" />
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
      {errors.country && <div className="text-[10px] text-red-600 mt-1 w-full">{errors.country.message}</div>}
      <Button type={"submit"} className="mt-2 ">
        {"Update"}
      </Button>
      <Button variant={"secondary"} type={"button"} className="mt-2" onClick={logout}>
        {"Logout"}
      </Button>
    </form>
  );
};

export default UpdateUserIdCountry;
