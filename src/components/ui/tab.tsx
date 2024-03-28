export const Tab = (props: any) => {
    const { children, setTab, currentTab, ...rest } = props;
    return (
      <div
        {...rest}
        onClick={() => {
          setTab(children);
        }}
        className={`cursor-pointer p-[1px] pb-0 bg-[linear-gradient(to_top,gray,white,#CACACA)] flex justify-center rounded-t-[10px] items-end`}
      >
        <div
          className={`${
            currentTab === children ? "bg-white/50" : "bg-[linear-gradient(to_bottom,#3B3B3B,#141414)] text-white"
          } flex-1 min-h-[100%] rounded-t-[10px] py-[6px] px-[20px]  border-[1px] border-[rgba(0,0,0,0.5)] text-black duration-300`}
        >
          {children}
        </div>
      </div>
    );
  };
  
  export const TabContent = (props: any) => {
    const { children, currentTab, tabName, className, ...rest } = props;
    return (
      <>
        {currentTab === tabName && (
          <div {...rest} className={className}>
            {children}
          </div>
        )}
      </>
    );
  };