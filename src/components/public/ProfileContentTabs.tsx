/**
 * ProfileContentTabs Component
 * Tabs untuk menampilkan Artikel, Khazanah, dan Rubrik di halaman profil penulis
 */

"use client";

import { useState, useEffect } from "react";
import { Search, Filter, BookOpen, PenLine } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KhazanahCard } from "@/components/public/KhazanahCard";
import { RubrikCard } from "@/components/public/RubrikCard";
import type { KhazanahItem, RubrikItem } from "@/lib/api/types";

interface ProfileContentTabsProps {
  authorId: string;
  isOwnProfile?: boolean;
}

type ContentStatus = "all" | "published" | "draft" | "archived";

export function ProfileContentTabs({
  authorId,
  isOwnProfile = false,
}: ProfileContentTabsProps) {
  const [activeTab, setActiveTab] = useState("khazanah");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContentStatus>("all");
  const [khazanahData, setKhazanahData] = useState<KhazanahItem[]>([]);
  const [rubrikData, setRubrikData] = useState<RubrikItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch khazanah data on initial mount (since it's the default tab)
  useEffect(() => {
    fetchKhazanah();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch data when tab changes
  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(1);

    if (value === "khazanah" && khazanahData.length === 0) {
      await fetchKhazanah();
    } else if (value === "rubrik" && rubrikData.length === 0) {
      await fetchRubrik();
    }
  };

  // Fetch Khazanah data
  const fetchKhazanah = async (page = 1, search = "", status: ContentStatus = "all") => {
    setIsLoading(true);
    try {
      const { studentService } = await import("@/lib/api");
      const params: any = {
        type: "khazanah" as const,
        page,
        per_page: 9,
      };

      if (search) params.search = search;
      if (status !== "all") params.status = status;

      const response = await studentService.getProfileWithContent(params);

      if (response.data.khazanahs) {
        setKhazanahData(response.data.khazanahs.data);
        setTotalPages(response.data.khazanahs.last_page);
        setCurrentPage(response.data.khazanahs.current_page);
      }
    } catch (error) {
      console.error("Error fetching khazanah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Rubrik data
  const fetchRubrik = async (page = 1, search = "", status: ContentStatus = "all") => {
    setIsLoading(true);
    try {
      const { studentService } = await import("@/lib/api");
      const params: any = {
        type: "rubrik" as const,
        page,
        per_page: 9,
      };

      if (search) params.search = search;
      if (status !== "all") params.status = status;

      const response = await studentService.getProfileWithContent(params);

      if (response.data.rubriks) {
        setRubrikData(response.data.rubriks.data);
        setTotalPages(response.data.rubriks.last_page);
        setCurrentPage(response.data.rubriks.current_page);
      }
    } catch (error) {
      console.error("Error fetching rubrik:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    if (activeTab === "khazanah") {
      fetchKhazanah(1, searchQuery, statusFilter);
    } else if (activeTab === "rubrik") {
      fetchRubrik(1, searchQuery, statusFilter);
    }
  };

  // Handle status filter
  const handleStatusFilter = (status: ContentStatus) => {
    setStatusFilter(status);
    setCurrentPage(1);
    if (activeTab === "khazanah") {
      fetchKhazanah(1, searchQuery, status);
    } else if (activeTab === "rubrik") {
      fetchRubrik(1, searchQuery, status);
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (activeTab === "khazanah") {
      fetchKhazanah(page, searchQuery, statusFilter);
    } else if (activeTab === "rubrik") {
      fetchRubrik(page, searchQuery, statusFilter);
    }
  };

  return (
    <div className="mt-8">
      <Tabs defaultValue="khazanah" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full sm:w-auto mb-6">
          <TabsTrigger value="khazanah" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Khazanah</span>
          </TabsTrigger>
          <TabsTrigger value="rubrik" className="flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            <span>Rubrik</span>
          </TabsTrigger>
        </TabsList>

        {/* Search and Filter - Only show for Khazanah and Rubrik tabs */}
        {(activeTab === "khazanah" || activeTab === "rubrik") && (
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Cari ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-islamGreen hover:bg-islamGreen-dark">
                Cari
              </Button>
            </div>

            {/* Status Filter - Only show for own profile */}
            {isOwnProfile && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">Status:</span>
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilter("all")}
                  className={statusFilter === "all" ? "bg-islamGreen hover:bg-islamGreen-dark" : ""}
                >
                  Semua
                </Button>
                <Button
                  variant={statusFilter === "published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilter("published")}
                  className={statusFilter === "published" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Published
                </Button>
                <Button
                  variant={statusFilter === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilter("draft")}
                  className={statusFilter === "draft" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                >
                  Draft
                </Button>
                <Button
                  variant={statusFilter === "archived" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilter("archived")}
                  className={statusFilter === "archived" ? "bg-gray-600 hover:bg-gray-700" : ""}
                >
                  Archived
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Khazanah Tab */}
        <TabsContent value="khazanah">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamGreen mx-auto mb-4"></div>
              <p>Memuat khazanah...</p>
            </div>
          ) : khazanahData.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {khazanahData.map((khazanah) => (
                  <KhazanahCard key={khazanah.id} khazanah={khazanah} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Sebelumnya
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-islamGreen hover:bg-islamGreen-dark" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Belum ada khazanah yang dipublikasikan</p>
            </div>
          )}
        </TabsContent>

        {/* Rubrik Tab */}
        <TabsContent value="rubrik">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamGreen mx-auto mb-4"></div>
              <p>Memuat rubrik...</p>
            </div>
          ) : rubrikData.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {rubrikData.map((rubrik) => (
                  <RubrikCard key={rubrik.id} rubrik={rubrik} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Sebelumnya
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-islamGreen hover:bg-islamGreen-dark" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <PenLine className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Belum ada rubrik yang dipublikasikan</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
