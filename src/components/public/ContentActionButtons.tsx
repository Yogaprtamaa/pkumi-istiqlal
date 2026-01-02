/**
 * ContentActionButtons Component
 * Action buttons untuk mengelola konten (khazanah/rubrik) milik sendiri
 * Hanya ditampilkan untuk konten dengan status draft atau archived
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveX, Trash2, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { khazanahService } from "@/lib/api/services/khazanah.service";
import { rubrikService } from "@/lib/api/services/rubrik.service";

interface ContentActionButtonsProps {
  type: "khazanah" | "rubrik";
  slug: string;
  status: "draft" | "published" | "archived";
  isOwnContent: boolean; // Apakah konten milik user yang sedang login
}

export function ContentActionButtons({
  type,
  slug,
  status,
  isOwnContent,
}: ContentActionButtonsProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Hanya tampilkan untuk konten milik sendiri dengan status draft atau archived
  if (!isOwnContent || status === "published") {
    return null;
  }

  const handleUnpublish = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Apakah Anda yakin ingin mengubah status menjadi draft?")) {
      return;
    }

    setIsProcessing(true);
    try {
      if (type === "khazanah") {
        await khazanahService.unpublishKhazanah(slug);
        alert("Khazanah berhasil diubah menjadi draft");
      } else {
        await rubrikService.unpublishRubrik(slug);
        alert("Rubrik berhasil diubah menjadi draft");
      }
      router.refresh();
    } catch (error: any) {
      console.error("Error unpublishing:", error);
      alert(error.message || "Gagal mengubah status. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleArchive = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const action =
      status === "archived" ? "mengaktifkan kembali" : "mengarsipkan";
    if (!confirm(`Apakah Anda yakin ingin ${action} konten ini?`)) {
      return;
    }

    setIsProcessing(true);
    try {
      if (type === "khazanah") {
        await khazanahService.archiveKhazanah(slug);
        alert(
          `Khazanah berhasil ${
            status === "archived" ? "diaktifkan kembali" : "diarsipkan"
          }`
        );
      } else {
        await rubrikService.archiveRubrik(slug);
        alert(
          `Rubrik berhasil ${
            status === "archived" ? "diaktifkan kembali" : "diarsipkan"
          }`
        );
      }
      router.refresh();
    } catch (error: any) {
      console.error("Error archiving:", error);
      alert(error.message || "Gagal mengubah status. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus ${type} ini? Tindakan ini tidak dapat dibatalkan!`
      )
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      if (type === "khazanah") {
        await khazanahService.deleteKhazanah(slug);
        alert("Khazanah berhasil dihapus");
      } else {
        await rubrikService.deleteRubrik(slug);
        alert("Rubrik berhasil dihapus");
      }
      // Refresh current page to update data
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting:", error);
      alert(error.message || "Gagal menghapus. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Redirect to edit page
    const editPath = `/submit/${type}/edit/${slug}`;
    router.push(editPath);
  };

  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      {/* Edit Button - Only show for draft status */}
      {status === "draft" && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleEdit}
          disabled={isProcessing}
          className="text-xs text-blue-600 hover:text-blue-700 hover:border-blue-600"
        >
          <Pencil className="h-3 w-3 mr-1" />
          Edit
        </Button>
      )}

      {/* Archive/Unarchive Button */}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleArchive}
        disabled={isProcessing}
        className="text-xs"
      >
        {isProcessing ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : status === "archived" ? (
          <>
            <ArchiveX className="h-3 w-3 mr-1" />
            Aktifkan
          </>
        ) : (
          <>
            <Archive className="h-3 w-3 mr-1" />
            Arsipkan
          </>
        )}
      </Button>

      {/* Delete Button */}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleDelete}
        disabled={isProcessing}
        className="text-xs text-red-600 hover:text-red-700 hover:border-red-600"
      >
        {isProcessing ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <>
            <Trash2 className="h-3 w-3 mr-1" />
            Hapus
          </>
        )}
      </Button>
    </div>
  );
}
