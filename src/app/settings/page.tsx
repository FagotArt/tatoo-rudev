"use client";
import { deleteMe, updateMe } from "@/actions/user/me";
import AuthenticatedSection from "@/components/authenticatedsection";
import BackgroundSection from "@/components/bgsection";
import BorderDecorations from "@/components/decoration/borderdecorations";
import Footer from "@/components/footer";
import Button from "@/components/ui/Button";
import BorderDiv from "@/components/ui/borderdiv";
import BorderDivider from "@/components/ui/borderdivider";
import CheckBox from "@/components/ui/checkbox";
import Divider from "@/components/ui/divider";
import DropDown from "@/components/ui/dropdown";
import ErrorMessage from "@/components/ui/errormessage";
import Input from "@/components/ui/input";
import MultiInput from "@/components/ui/multiinput";
import Notice from "@/components/ui/notice";
import PortfolioEditor from "@/components/ui/portfolioeditor";
import ProfilePicture from "@/components/ui/profilepicture";
import RoundedTitle from "@/components/ui/roundedtitle";
import { Tab, TabContent } from "@/components/ui/tab";
import TextArea from "@/components/ui/textarea";
import { confirm } from "@/lib/utils/modal";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const user: any = session?.data?.user;
  const [currentTab, setCurrentTab] = useState<any>("General");
  const [newUser, setNewUser] = useState<any>();
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    if (searchParams.has("tab")) {
      setCurrentTab(searchParams.get("tab"));
    }
  }, [searchParams]);

  const handleInputChange = (path: string) => (e: any) => {
    const value = e.target.value;
    const keys = path.split(".");

    setNewUser((prevUser: any) => {
      // Clone the previous state
      let updatedUser = { ...prevUser };
      let current = updatedUser;
      let referenceCurrent = user;

      // Iterate over the keys to handle nested objects
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current[key] === undefined) current[key] = {}; // Create nested object if it doesn't exist
        current = current[key];
        referenceCurrent = referenceCurrent[key] || {};
      }

      // Set or delete the final value
      const finalKey = keys[keys.length - 1];
      if (referenceCurrent[finalKey] === value) {
        delete current[finalKey];
      } else {
        current[finalKey] = value;
      }

      return updatedUser;
    });
  };

  const hasChanged = () => {
    if (!newUser) return false;

    return Object.keys(newUser).some((key) => {
      if (newUser[key] == null && user[key] == null) return false;

      // Check if both are arrays
      if (Array.isArray(newUser[key]) && Array.isArray(user[key])) {
        // Compare lengths and contents
        return newUser[key].length !== user[key].length || !newUser[key].every((val: any, index: any) => val === user[key][index]);
      }

      return newUser[key] !== user[key];
    });
  };

  const save = async () => {
    const { error } = await updateMe(newUser);
    if (error) {
      console.log(error);
      setErrors({ ...error, globalError: "There was an error updating your profile. Please make sure all fields are valid." });
    } else {
      setErrors(null);
      session.update();
      setNewUser(null);
    }
  };

  const deleteAccount = async () => {
    const result = await confirm({ confirmation: "Are you sure you want to delete your account? This action cannot be undone." });
    if (result) {
      const res = await deleteMe();
      if (res.error) {
        console.log(res.error);
      } else {
        await signOut({ redirect: false });
        router.push("/");
      }
    }
  };

  return (
    <div className="p-[10px]">
      <AuthenticatedSection className="pt-[150px]" user={user}>
        <BackgroundSection className="md:pt-[150px] flex flex-col md:flex-row items-stretch" image="/images/bg_right_skull_design.png">
          <div className="relative min-w-[200px] p-[2rem]">
            <BorderDecorations className='hidden md:block' rightBorder />
            <ProfilePicture
              edit
              error={errors?.profilePicture}
              onImageChange={(image: any) => {
                handleInputChange("profilePicture")({
                  target: {
                    value: image,
                  },
                });
              }}
              noBorder
              image={user?.profilePicture}
              imageClassName="mx-auto relative"
              className="mx-auto w-[200px] h-[200px] mt-[20px] z-[10]"
            />
            <BorderDiv
              className="mb-[1rem] max-h-[200px] font-['Helvetica'] overflow-auto"
              contentClassName="text-white text-[0.9rem] p-[1rem] min-h-[100px] bg-[linear-gradient(to_bottom,#3B3B3B,#141414)]"
            >
              <div>
                <span className="font-bold">Name:</span>
                <span className="ml-[10px]">{user?.firstName + " " + user?.lastName}</span>
              </div>
              <div>
                <span className="font-bold">Email Address:</span>
                <span className="ml-[10px]">{user?.email}</span>
              </div>
              <div>
                <span className="font-bold">Phone Number:</span>
                <span className="ml-[10px]">{user?.phoneNumber}</span>
              </div>
            </BorderDiv>
            <Divider className="!mb-[1rem]" />
            <Button containerClassName="w-full mb-[1rem]" href={`/profile`}>
              View Profile
            </Button>
            {user?.role === "artist" && (
              <Button containerClassName="w-full" href={`/artists/${user?.username}`}>
                View Artist Page
              </Button>
            )}
          </div>
          <div className="flex-1">
            <div className="relative p-[1rem]">
              <div className="text-5xl mb-[0.5rem]">Settings</div>
            </div>
            <div className="flex">
              <Tab currentTab={currentTab} setTab={setCurrentTab}>
                General
              </Tab>
              {user?.role === "artist" && (
                <Tab currentTab={currentTab} setTab={setCurrentTab}>
                  Artist
                </Tab>
              )}
            </div>
            <BorderDivider className="w-[calc(100%-2px)] !mx-0 opacity-[0.5]" />
            {hasChanged() && (
              <div className="p-[1rem] mb-[10px] pb-0 ">
                <div className="flex items-center justify-start gap-[1rem]">
                  <Button onClick={save}>Save Changes</Button>
                </div>
                {errors?.globalError && <ErrorMessage>{errors?.globalError}</ErrorMessage>}
              </div>
            )}
            <TabContent currentTab={currentTab} tabName="General">
              <div className="p-[1rem] pl-0">
                <RoundedTitle className="mb-[2rem]">Account</RoundedTitle>
                <div className="p-[1rem] flex flex-col gap-[10px] max-w-[300px]">
                  <Input
                    error={errors?.firstName}
                    onChange={handleInputChange("firstName")}
                    defaultValue={user?.firstName}
                    label="First Name:"
                    containerClassName="min-w-[300px] max-w-[300px]"
                  />
                  <Input
                    error={errors?.lastName}
                    onChange={handleInputChange("lastName")}
                    defaultValue={user?.lastName}
                    label="Last Name:"
                    containerClassName="min-w-[300px] max-w-[300px]"
                  />
                  <Input
                    error={errors?.username}
                    onChange={handleInputChange("username")}
                    defaultValue={user?.username}
                    label="Username:"
                    containerClassName="min-w-[300px] max-w-[300px]"
                  />
                  <Input error={errors?.email} onChange={handleInputChange("email")} defaultValue={user?.email} label="Email:" containerClassName="min-w-[300px] max-w-[300px]" />
                  <DropDown
                    onChange={(option: any) => {
                      handleInputChange("gender")({
                        target: {
                          value: option.value,
                        },
                      });
                    }}
                    label="Artist Gender:"
                    defaultOption={
                      user?.gender
                        ? {
                            label: user?.gender === "m" ? "Male" : "Female",
                            value: user?.gender,
                          }
                        : null
                    }
                    options={[
                      { label: "Male", value: "m" },
                      { label: "Female", value: "f" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-[1rem] pl-0">
                <RoundedTitle className="mb-[2rem]">Security</RoundedTitle>
                <div className="p-[1rem] flex flex-col gap-[10px] max-w-[300px]">
                  <Input type='password' error={errors?.password} onChange={handleInputChange("password")} label="Password:" containerClassName="min-w-[300px] max-w-[300px]" />
                  {newUser?.password && (
                    <>
                    <Input type='password'
                      error={errors?.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      label="Confirm Password:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                    <Input type='password'
                      error={errors?.currentPassword}
                      onChange={handleInputChange("currentPassword")}
                      label="Current Password:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                    </>
                  )
                  }
                </div>
              </div>
              <div className="p-[1rem] pl-0">
                <RoundedTitle className="mb-[2rem]">Delete Account</RoundedTitle>
                <div className="p-[1rem] flex flex-col gap-[10px] ">
                  <Notice className="mb-[1rem]">Deleting your account will permanently remove it and all of your data. This action cannot be undone.</Notice>
                  <Button onClick={deleteAccount}>Delete Account</Button>
                </div>
              </div>
            </TabContent>
            {user?.role === "artist" && (
              <TabContent currentTab={currentTab} tabName="Artist">
                <div className="p-[1rem] pl-0">
                  <RoundedTitle className="mb-[2rem]">Artist Contact</RoundedTitle>
                  <div className="p-[1rem] flex flex-col gap-[10px] max-w-[300px]">
                    <Input
                      error={errors?.contactInfo?.phone}
                      onChange={handleInputChange("contactInfo.phone")}
                      onKeyDown={(e: any) => {
                        const validPhoneRegex = "+-()0123456789";
                        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
                        if (!validPhoneRegex.includes(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                      defaultValue={user?.contactInfo?.phone}
                      label="Phone Number:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                    <Input
                      error={errors?.contactInfo?.email}
                      onChange={handleInputChange("contactInfo.email")}
                      defaultValue={user?.contactInfo?.email}
                      label="Email:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                    <Input
                      error={errors?.contactInfo?.instagram}
                      onChange={handleInputChange("contactInfo.instagram")}
                      defaultValue={user?.contactInfo?.instagram}
                      label="Instagram:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                    <Input
                      error={errors?.contactInfo?.facebook}
                      onChange={handleInputChange("contactInfo.facebook")}
                      defaultValue={user?.contactInfo?.facebook}
                      label="Facebook:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                    />
                  </div>
                </div>
                <div className="p-[1rem] pl-0">
                  <RoundedTitle className="mb-[2rem]">Portfolio Images</RoundedTitle>
                  <div className="p-[1rem] flex flex-col gap-[10px]">
                    <PortfolioEditor
                      errors={errors?.images}
                      images={user?.images}
                      onChange={(images: any) => {
                        handleInputChange("images")({
                          target: {
                            value: images,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-[1rem] pl-0">
                  <RoundedTitle className="mb-[2rem]">Artist Info</RoundedTitle>
                  <div className="p-[1rem] flex flex-col gap-[10px] max-w-[300px]">
                    <TextArea
                      onChange={handleInputChange("bio")}
                      error={errors?.bio}
                      defaultValue={user?.bio}
                      containerClassName="w-[300px] max-w-[300px] min-w-[300px]"
                      placeHolder="bio..."
                      inputClassName="h-[200px]"
                    />
                    <MultiInput
                      label="Styles :"
                      contentOuterClassName="max-w-[300px] min-w-[300px]"
                      onChange={(value: any) => {
                        handleInputChange("styles")({
                          target: {
                            value: value,
                          },
                        });
                      }}
                      error={errors?.styles}
                      defaultValue={user?.styles}
                    />
                    <Input
                      label="Tattoo Type:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                      error={errors?.tattooType}
                      onChange={handleInputChange("tattooType")}
                      defaultValue={user?.tattooType}
                    />
                    <Input
                      label="Location:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                      error={errors?.location}
                      onChange={handleInputChange("location")}
                      defaultValue={user?.location}
                    />
                    <Input
                      label="Hourly Rate:"
                      containerClassName="min-w-[300px] max-w-[300px]"
                      error={errors?.hourlyRate}
                      onChange={handleInputChange("hourlyRate")}
                      onKeyDown={(e: any) => {
                        const validPhoneRegex = "0123456789";
                        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
                        if (!validPhoneRegex.includes(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                      defaultValue={user?.hourlyRate}
                    />
                    <CheckBox
                      onChange={(checked: boolean) => {
                        handleInputChange("walkInsAccepted")({
                          target: {
                            value: checked,
                          },
                        });
                      }}
                      label="Accept Walk-ins"
                      defaultValue={user?.walkInsAccepted}
                    />
                  </div>
                </div>
              </TabContent>
            )}
          </div>
        </BackgroundSection>
      </AuthenticatedSection>
      <div className="mx-[3px]">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
