"use client";
import Button from "@/components/ui/Button";
import BorderDiv from "@/components/ui/borderdiv";
import { useEffect, useRef } from "react";
import { confirmable, createConfirmation } from "react-confirm";
import { IoClose } from "react-icons/io5";

interface confirmProps {
  confirmation?: string; // this is the message in the modal
}

interface modalProps {
  Element: any;
  /**
   * if true, the modal content will only be the Element, without the close button or the border
   *
   * @default false
   */
  raw?: boolean;

  /**
   * if raw is true and includeCloseButton is true, the close button will be included
   *
   * @default false
   */
  includeCloseButton?: boolean;
}

const styles = {
  overlay: {
    position: "fixed",
    maxWidth: "100vw",
    transition: "0.3s",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    maxWidth: "90%",
    opacity: 0,
    color: "black",
    transform: "translateY(20px)",
    transition: "0.3s",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const CloseButton = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={`absolute cursor-pointer top-0 right-0 translate-x-[50%] translate-y-[-25%] rounded-full p-[1px] bg-[linear-gradient(to_top,gray,white,#CACACA)] flex justify-center items-center`}
    >
      <div
        className={`bg-[linear-gradient(to_top,#EFEFEF,#CACACA_5%,white)] flex-1 min-h-[100%] rounded-full p-[10px] border-[1px] border-[rgba(0,0,0,0.5)] text-black duration-300 shadow-[0px_0px_10px_rgba(0,0,0,0.3)_inset] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)_inset]`}
      >
        <IoClose size={20} />
      </div>
    </div>
  );
};

const Dialog = ({ show, proceed, Element }: any) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (backgroundRef?.current) {
        backgroundRef.current.style.background = "rgba(0,0,0,0.7)";
        backgroundRef.current.style.backdropFilter = "blur(4px)";
        const mainContent = backgroundRef.current.querySelector(".modal-content") as HTMLDivElement;
        if (mainContent) {
          mainContent.style.opacity = "1";
          mainContent.style.transform = "none";
        }
      }
    });
  }, [backgroundRef]);

  const close = () => {
    hide();
    setTimeout(() => {
      proceed(false);
    }, 300);
  };

  const accept = () => {
    hide();
    setTimeout(() => {
      proceed(true);
    }, 300);
  };

  const proc = (value: any) => {
    hide();
    setTimeout(() => {
      proceed(value);
    }, 300);
  };

  const hide = () => {
    if (backgroundRef?.current) {
      backgroundRef.current.style.background = "transparent";
      backgroundRef.current.style.backdropFilter = "none";
      const mainContent = backgroundRef.current.querySelector(".modal-content") as HTMLDivElement;
      if (mainContent) {
        mainContent.style.opacity = "0";
        mainContent.style.transform = "translateY(20px)";
      }
    }
  };

  return (
    <>
      {show && (
        <div ref={backgroundRef} style={styles.overlay}>
          <div style={styles.content} className="modal-content">
            <Element close={close} proceed={proc} accept={accept} />
          </div>
        </div>
      )}
    </>
  );
};

const Confirm = (confirmation: any) => {
  const ConfirmComponent = ({ accept, close }: any) => {
    return (
      <BorderDiv contentClassName="px-[2rem] py-[2rem]">
        <CloseButton onClick={close} />
        <div className="p-[20px] mb-[1rem] text-center font-bold">{confirmation}</div>
        <div className="flex justify-center items-center gap-[1rem]">
          <Button onClick={accept}>Yes</Button>
          <Button onClick={close}>No</Button>
        </div>
      </BorderDiv>
    );
  };
  ConfirmComponent.displayName = "ConfirmComponent";
  return ConfirmComponent;
};

const Wrapper = (Element: any) => {
  const WrapperComponent = (props: any) => {
    return (
      <BorderDiv contentClassName="px-[2rem] py-[2rem]">
        <CloseButton onClick={props.close} />
        <Element {...props} />
      </BorderDiv>
    );
  };
  WrapperComponent.displayName = "WrapperComponent";
  return WrapperComponent;
};

export const confirm = (props: confirmProps) => {
  return createConfirmation(confirmable(Dialog))({
    ...props,
    Element: Confirm(props.confirmation),
  });
};

export const modal = (props: modalProps) => {
  if (props.raw)
    return createConfirmation(confirmable(Dialog))({
      ...props,
      Element: props.includeCloseButton
        ? (pr: any) => {
            return (
              <>
                <CloseButton onClick={pr.close} />
                <props.Element {...pr} />
              </>
            );
          }
        : props.Element,
    });
  return createConfirmation(confirmable(Dialog))({
    ...props,
    Element: Wrapper(props.Element),
  });
};
