export const LandingWrapper = ({ children }) => (
  <div
    style={{
      backgroundImage: "url(/assets/landingBackground.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
      maxHeight: "100vh",
    }}
  >
    {children}
  </div>
);
