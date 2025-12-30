function Footer() {
  return (
    <div className=" sticky bottom-0 bg-gray-700  text-white p-4 mt-[410px]">
      <p className="text-2xl font-bold">
        Copyright &copy; {new Date().getFullYear()} Redux Online Store. All
        rights reserved.
      </p>
    </div>
  );
}

export default Footer;
