import Image from 'next/image';

export default function Home() {
  return (
    <section className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] mx-auto flex flex-col border-2 border-black border-solid">
      <div className="flex py-4">
        <h3 className="mr-auto">Temp</h3>
        <div className="flex gap-2">
          <button>DP</button>
          <aside className="hidden">TASKS</aside>
          <button>ST</button>
        </div>
      </div>
      <main className="flex-1 relative grid">
        <Image
          src="/taskVenom-desktop.jpg"
          alt="task background"
          className="object-cover"
          fill
        />
      </main>
    </section>
  );
}
