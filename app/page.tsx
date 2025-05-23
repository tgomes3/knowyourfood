import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Know Your Food</h1>
      <Link
        href="/onboarding"
        className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
      >
        Start Onboarding
      </Link>
    </div>
  );
}
