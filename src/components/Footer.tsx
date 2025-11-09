const Footer = () => {
  return (
    <footer className="bg-forest-deep border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-primary mb-1">ForestGuard</div>
            <p className="text-sm text-foreground/60">Built for Hackathons. Built for Earth.</p>
          </div>
          <div className="text-sm text-foreground/60">
            © 2025 ForestGuard. Open Source & Community Driven.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
