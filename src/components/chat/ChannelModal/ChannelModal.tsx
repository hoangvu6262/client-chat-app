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
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import CustomModal from "../../shared/Modal/Modal";
import useModal from "../../../hooks/useModal";
import channelAPI from "../../../api/channelApi";
import CommonSelect from "../../shared/Select/Select";
import CustomInput from "../../shared/Input/CustomInput";
import { LIST_CHANNEL_TYPES } from "../../../configs/constant/channel";

type Props = {
  addChannel: (data: IChannel) => void;
};

export type ChannelModalRefType = {
  onOpen: (data?: Record<string, any>) => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required.",
  }),
  type: z.string().min(1, {
    message: "Type channel is required.",
  }),
});

const initialValue = {
  name: "",
  type: "",
};

const ChannelModal = ({ addChannel }: Props, ref: Ref<ChannelModalRefType>) => {
  const { open, _handleToggle } = useModal();
  const { user } = useUser();

  const { serverId } = useParams();

  useImperativeHandle(ref, () => ({
    onOpen: _handleToggle,
  }));

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  if (!user || !serverId) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const data: IChannel = {
        ...values,
        userId: user.id,
        serverId,
      };
      const res = await channelAPI.createNewChannel(data);
      addChannel(res);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Name"
              name="name"
              type="text"
              placeholder="Name of Server"
            />
            <CommonSelect
              id="channel-types-select"
              name="type"
              listItem={LIST_CHANNEL_TYPES}
              errors={errors}
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

export default forwardRef(ChannelModal);
