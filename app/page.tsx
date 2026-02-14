"use client";
import React, { useState } from "react";
import {
	Music,
	Mic2,
	Clock,
	Mail,
	Send,
	CheckCircle2,
	Loader2,
	Sparkles,
} from "lucide-react";

export default function App() {
	const [formData, setFormData] = useState({
		signer: "",
		videoCount: null,
		email: "",
		duration: null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("https://himanshu.co/api/mashup2/process", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: formData.signer,
					n: parseInt(formData.videoCount),
					email: formData.email,
					duration: parseInt(formData.duration),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to process mashup");
			}

			setIsSuccess(true);

			// setFormData({ signer: "", videoCount: 1, email: "" });

			setTimeout(() => setIsSuccess(false), 5000);
		} catch (err) {
			console.error("Submission error:", err);
			setIsSuccess(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-rose-500/30">
			{/* Dynamic Background Gradients */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 blur-[130px] rounded-full opacity-60" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[130px] rounded-full opacity-60" />
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
				{/* Header Section */}
				<header className="text-center mb-16">
					<div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-violet-500/20 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
						<Sparkles className="w-8 h-8 text-rose-400" />
					</div>
					<h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4">
						MASHUP STUDIO
					</h1>
					<p className="text-zinc-400 text-lg font-medium tracking-wide uppercase text-xs opacity-80">
						Professional Audio Synthesis Engine
					</p>
				</header>

				{/* Main Form Card */}
				<div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
					{/* Subtle inner glow */}
					<div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.03] to-transparent pointer-events-none" />

					<form onSubmit={handleSubmit} className="relative z-10 space-y-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
							{/* Singer Name */}
							<div className="space-y-3 group/field">
								<label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/field:text-rose-400 transition-colors">
									<Mic2 className="w-4 h-4" /> Artist Name
								</label>
								<input
									required
									type="text"
									name="signer"
									value={formData.signer}
									onChange={handleChange}
									placeholder="The Weeknd, Drake..."
									className="w-full bg-zinc-950/40 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all placeholder:text-zinc-700 text-zinc-200"
								/>
							</div>

							{/* Number of Songs */}
							<div className="space-y-3 group/field">
								<label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/field:text-rose-400 transition-colors">
									<Music className="w-4 h-4" /> Quantity
								</label>
								<input
									required
									type="number"
									name="videoCount"
									min="1"
									value={formData.videoCount}
									onChange={handleChange}
									placeholder="No. of tracks (> 10)"
									className="w-full bg-zinc-950/40 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all placeholder:text-zinc-700 text-zinc-200"
								/>
							</div>

							{/* Duration per song */}
							<div className="space-y-3 group/field">
								<label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/field:text-violet-400 transition-colors">
									<Clock className="w-4 h-4" /> Segment Length
								</label>
								<input
									required
									type="number"
									name="duration"
									min="5"
									value={formData.duration}
									onChange={handleChange}
									placeholder="Seconds per track (> 20)"
									className="w-full bg-zinc-950/40 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all placeholder:text-zinc-700 text-zinc-200"
								/>
							</div>

							{/* Email Address */}
							<div className="space-y-3 group/field">
								<label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/field:text-violet-400 transition-colors">
									<Mail className="w-4 h-4" /> Delivery Email
								</label>
								<input
									required
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="your@studio.com"
									className="w-full bg-zinc-950/40 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all placeholder:text-zinc-700 text-zinc-200"
								/>
							</div>
						</div>

						{/* Success Feedback */}
						{isSuccess && (
							<div className="flex items-center gap-3 p-5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-2xl animate-in zoom-in-95 duration-300">
								<CheckCircle2 className="w-5 h-5 flex-shrink-0" />
								<span className="text-sm font-medium">
									Request queued. Your mashup is being rendered!
								</span>
							</div>
						)}

						{/* Action Button */}
						<div className="pt-4">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full relative group overflow-hidden h-16 rounded-2xl bg-gradient-to-r from-rose-600 to-violet-600 p-[1px] shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:shadow-[0_0_40px_rgba(244,63,94,0.25)] transition-all active:scale-[0.99]"
							>
								<div className="w-full h-full bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[15px] flex items-center justify-center gap-3">
									{isSubmitting ? (
										<>
											<Loader2 className="w-5 h-5 animate-spin text-rose-400" />
											<span className="font-bold uppercase tracking-[0.2em] text-sm">
												Processing...
											</span>
										</>
									) : (
										<>
											<span className="font-bold uppercase tracking-[0.2em] text-sm">
												Generate Mashup
											</span>
											<Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
										</>
									)}
								</div>
							</button>
						</div>
					</form>
				</div>

				{/* System Status Footer */}
				<footer className="mt-16 flex flex-col items-center gap-4">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
							<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
								Cloud Nodes Active
							</span>
						</div>
						<div className="h-4 w-[1px] bg-zinc-800" />
						<div className="flex items-center gap-2">
							<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
								v4.2.0-Stable
							</span>
						</div>
					</div>
					<p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">
						© 2024 MASHUP STUDIO GLOBAL
					</p>
				</footer>
			</div>
		</div>
	);
}
