import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormSchemaType = z.ZodObject<Record<string, any>>;

type Props = {
  formSchema: FormSchemaType;
  initialValue: Record<string, any>;
};

const useFormApp = ({ formSchema, initialValue }: Props) => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  return { methods } as const;
};

export default useFormApp;
