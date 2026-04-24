const Footer = () => {
  return (
    <footer className="container pb-10">
      <div className="bg-foreground text-background rounded-t-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Positivus. All rights reserved.</p>
        <p className="text-background/70">Privacy Policy · Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
