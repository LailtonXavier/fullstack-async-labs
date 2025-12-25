export default function Footer() {
  return (
    <footer className="mx-6 mb-6 rounded-3xl bg-black px-10 py-20 text-white dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        <h1 className="md:text-7xl text-6xl font-extrabold tracking-tight">
          BUY.NOW<span className="align-super text-3xl">©</span>
        </h1>

        <div className="space-y-2 text-sm opacity-70">
          <p>(81) 97121-0044</p>
          <p><a target='_blank' href='https://www.instagram.com/lailtonnx/'>Instagram</a></p>
          <p>2025© — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
