import { useImperativeHandle, forwardRef, Ref } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

import CustomModal from "../../shared/Modal/Modal";
import serverAPI from "../../../api/severApi";
import AvatarUpload from "../../shared/AvatarUpload/AvatarUpload";
import useModal from "../../../hooks/useModal";

type Props = {
  addNewServer: (server: IServer) => void;
};

export type RefType = {
  onToggle: (data?: Record<string, any>) => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.any(),
});

const ServerModal = ({ addNewServer }: Props, ref: Ref<RefType>) => {
  const { open, _handleToggle } = useModal();

  const { user } = useUser();
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors, isSubmitting },
  } = methods;

  useImperativeHandle(ref, () => ({
    onToggle: _handleToggle,
  }));

  if (!user) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newServer: IServer = {
        userId: user.id,
        name: values.name,
        imageUrl: values.imageUrl[0],
      };
      const res = await serverAPI.createNewServer(newServer);
      addNewServer(res.server);
      _handleToggle();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomModal open={open} handleClose={_handleToggle}>
      <DialogTitle>Create a Server</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give your server a personality with a name and an image. You can
          always change it later.
        </DialogContentText>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <AvatarUpload name="imageUrl" />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              {...register("name")}
              type="text"
              placeholder="Create a new server"
              fullWidth
              //   variant="standard"
            />
            <DialogActions>
              <Button onClick={handleSubmit(onSubmit)}>Create</Button>
              <Button onClick={_handleToggle}>Cancel</Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </CustomModal>
  );
};

export default forwardRef(ServerModal);
