import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Modal, IconButton, Box, Fade, Backdrop, Zoom, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { ArrowRight } from "lucide-react"

const Certificate = ({ certificate, institution, id }: { certificate: string; institution: string; id: number }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				className=""
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
						"& .overlay": {
							opacity: 1,
						},
						"& .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}>
				{/* Certificate Image with Initial Filter */}
				<Box
					sx={{
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0, 0, 0, 0.1)",
							zIndex: 1,
						},
					}}>
					<Image
						className="certificate-image"
						src={certificate}
						alt="Certificate"
						width={1200}
						height={850}
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
						}}
						onClick={handleOpen}
					/>
				</Box>

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 2,
					}}
					onClick={handleOpen}>
					{/* Hover Content */}
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
						}}>
						<FullscreenIcon
							sx={{
								fontSize: 40,
								mb: 1,
								filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								textShadow: "0 2px 4px rgba(0,0,0,0.3)",
							}}>
							View Certificate
						</Typography>
					</Box>
				</Box>
			</Box>

			<div className="mt-3 flex items-center justify-between gap-3">
				{institution && (
					<p className="text-sm font-medium text-slate-300">
						{institution}
					</p>
				)}

				{id ? (
					<Link
						href={`/certifications/${id}`}
						className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
					>
						<span>Details</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
				) : (
					<span className="shrink-0 text-sm text-gray-500">Details Not Available</span>
				)}
			</div>

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 300,
						sx: {
							backgroundColor: "rgba(0, 0, 0, 0.9)",
							backdropFilter: "blur(5px)",
						},
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Box
					sx={{
						position: "relative",
						width: "auto",
						maxWidth: "90vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 1,
							padding: 1,
							"&:hover": {
								bgcolor: "rgba(0,0,0,0.8)",
								transform: "scale(1.1)",
							},
						}}
						size="large">
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{/* Modal Image */}
					<Image
						src={certificate}
						alt="Certificate Full View"
						width={1600}
						height={1133}
						style={{
							display: "block",
							maxWidth: "100%",
							maxHeight: "90vh",
							margin: "0 auto",
							objectFit: "contain",
						}}
					/>
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate
