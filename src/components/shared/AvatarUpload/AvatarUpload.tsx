import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useFormContext } from "react-hook-form";

import "./styles.scss";

type Props = {
  name: string;
};

const AvatarUpload = ({ name }: Props) => {
  const [image, setImage] = useState<string>("");
  const { register } = useFormContext();

  // show preview image
  const showPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        if (x.target) {
          setImage(x.target.result as string);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <div className="avatar-upload">
      <label htmlFor={name}>
        <div className="avatar-upload__logo">
          <Avatar
            src={image}
            variant="rounded"
            alt="profile-logo"
            className="avatar-upload__logo-avatar"
            // onClick={() => fileInput.current.click()}
          />
        </div>
      </label>

      {/* <h6>{t("allowImgFormat", { ns: "profile" })}</h6>
      <h6>{t("allowImgSize", { ns: "profile" })}</h6> */}
      <input
        className="avatar-upload__file-input"
        id={name}
        type="file"
        {...register(name)}
        name={name}
        onChange={showPreviewImage}
        // ref={fileInput}
      />
      {/* <p className="profile-form__error">{errors.logo?.message}</p> */}
    </div>
  );
};

export default AvatarUpload;
