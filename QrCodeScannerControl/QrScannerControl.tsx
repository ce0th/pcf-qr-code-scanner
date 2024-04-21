import * as React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { QrCodeRegular } from "@fluentui/react-icons";

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  makeStyles,
} from "@fluentui/react-components";



export type QrProps = {
  populateField: (value: string) => void;
  position: string;
  label: string
};

export const QrCodeScanner: React.FunctionComponent<QrProps> = (
  props
) => {
  const { populateField, position, label } = props;
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: position,
    },
  });
  const styles = useStyles();

  return (
    <Dialog
      modalType="non-modal"
      open={open}
      onOpenChange={(event, data) => setOpen(data.open)}
    >
      <div className={styles.root}>
        <DialogTrigger disableButtonEnhancement>
          <Button shape="rounded" appearance="primary" icon={<QrCodeRegular />}>
            {label}
          </Button>
        </DialogTrigger>
      </div>

      <DialogSurface>
        <DialogBody>
          <DialogContent>
            <Scanner
              components={{
                audio: true,
                torch: true,
                count: true,
                onOff: true,
                tracker: true,
              }}
              options={{
                constraints: {
                  facingMode: "environment",
                },
              }}
              onResult={(text, result) => {
                populateField(text);
                setOpen(false);
              }}
              onError={(error) => alert(error?.message)}
            />
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
