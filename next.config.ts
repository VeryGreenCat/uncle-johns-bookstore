import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: [
			"yynfzvxxyvivwcvvzk.supabase.co",
			"promptpay.io", // Add this line
		],
	},
	typescript: {
		// ปิดการตรวจสอบ TypeScript ระหว่างการ build
		ignoreBuildErrors: true,
	},
	reactStrictMode: false,
};

export default nextConfig;
