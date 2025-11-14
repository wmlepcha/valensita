import { Head } from '@inertiajs/react';

export default function Main() {
  return (
    <>
      <Head title="VALENSITA" />

      {/* Page shell using DaisyUI theme tokens */}
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-200">
        {/* Top bar */}
        <div className="navbar bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 border-b border-base-200">
          <div className="navbar-start" />
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-2xl font-black tracking-widest">VALENSITA</a>
          </div>
          <div className="navbar-end" />
        </div>

        {/* Centered hero section */}
        <div className="hero min-h-[calc(100vh-4rem)]">
          <div className="hero-content w-full max-w-5xl flex-col">
            {/* Badge + headline */}
            <div className="mb-4">
              <div className="badge badge-primary badge-outline">E‑commerce</div>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center">
              Something delightful is <span className="text-primary">coming</span>
            </h1>

            <p className="mt-4 max-w-2xl text-center text-base-content/70 text-lg">
              VALENSITA — a modern, elegant shopping experience. Starting soon.
            </p>

            {/* Countdown (static placeholder) */}
            <div className="mt-6 grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="rounded-box bg-base-100 p-4 shadow">
                <span className="countdown font-mono text-4xl">
                  <span style={{['--value' as any]: 12}} />
                </span>
                <div className="text-xs opacity-70">days</div>
              </div>
              <div className="rounded-box bg-base-100 p-4 shadow">
                <span className="countdown font-mono text-4xl">
                  <span style={{['--value' as any]: 8}} />
                </span>
                <div className="text-xs opacity-70">hours</div>
              </div>
              <div className="rounded-box bg-base-100 p-4 shadow">
                <span className="countdown font-mono text-4xl">
                  <span style={{['--value' as any]: 45}} />
                </span>
                <div className="text-xs opacity-70">min</div>
              </div>
              <div className="rounded-box bg-base-100 p-4 shadow">
                <span className="countdown font-mono text-4xl">
                  <span style={{['--value' as any]: 12}} />
                </span>
                <div className="text-xs opacity-70">sec</div>
              </div>
            </div>

            {/* Notify form (disabled for now) */}
            <div className="mt-8 w-full max-w-md">
              <div className="join w-full">
                <input disabled type="email" placeholder="Email for launch updates" className="input input-bordered join-item w-full" />
                <button disabled className="btn btn-primary join-item">Notify Me</button>
              </div>
              <p className="text-xs opacity-60 mt-2 text-center">We’ll never share your email. Feature coming soon.</p>
            </div>

            {/* Footer mini */}
            <div className="mt-10 text-sm opacity-60">© {new Date().getFullYear()} VALENSITA</div>
          </div>
        </div>
      </div>
    </>
  );
}


