"use client";

import { useEffect, useState } from "react";
import { Sword } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User, UserResponse } from "@/types/type";
import { Avatar, Button, Pagination, Spin } from "antd";
import { useStore } from "@/store";

export default function XPlayPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.user);
  const [users, setUsers] = useState<UserResponse | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFighter, setSelectedFighter] = useState<number | null>(null);

  const handleFighterSelect = (id: number) => {
    setSelectedFighter(id);
    router.push(`/battle?fighter=${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.xpad-extension.baboons.tech/api/user/list/",
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (users?.total_pages && currentPage < users?.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  console.log("user", user);

  console.log("user", users);

  return (
    <>
      <main className="min-h-screen bg-background text-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-brand-lime">
              Ultimate Fighter Championship
            </h1>
            <p className="text-muted text-sm sm:text-base">
              Choose your opponent to begin the battle
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center w-full">
              <Spin />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {users &&
                users!.results
                  .filter((f) => f.username !== user?.username)
                  .map((user) => (
                    <div
                      key={user.id}
                      className={
                        "p-6 cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-b from-card/90 to-black/90 border-brand-lime/20 hover:border-brand-lime/40 " +
                        (selectedFighter === user.id &&
                          "ring-2 ring-brand-lime shadow-lg shadow-brand-lime/20")
                      }
                      onClick={() => handleFighterSelect(user.id)}
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <Avatar
                            className="w-24 h-24 ring-4 ring-brand-lime/20"
                            src={user.avatar}
                          ></Avatar>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1 rounded-full border border-brand-lime/20">
                            <div className="flex items-center space-x-1">
                              <Sword className="w-4 h-4 text-brand-lime" />
                              <span className="text-sm font-mono text-brand-lime">
                                {user.points}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <h3 className="text-brand-white font-bold text-lg">
                            {user.username}
                          </h3>
                        </div>
                        <Button
                          className="w-full mt-4 bg-gradient-to-r from-brand-lime to-brand-lime-dark hover:from-brand-lime-dark hover:to-brand-lime text-background font-bold transition-all duration-300 hover:shadow-lg hover:shadow-brand-lime/20"
                          onClick={() => handleFighterSelect(user.id)}
                        >
                          Challenge Fighter
                        </Button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className="mt-10">
          <Pagination>
            {/*<PaginationContent>*/}
            {/*  <PaginationItem>*/}
            {/*    <PaginationPrevious onClick={handlePrevPage} />*/}
            {/*  </PaginationItem>*/}

            {/*  {users &&*/}
            {/*    Array.from({ length: users?.total_pages }, (_, index) => {*/}
            {/*      const page = index + 1;*/}
            {/*      return (*/}
            {/*        <PaginationItem key={page}>*/}
            {/*          <PaginationLink*/}
            {/*            isActive={page === currentPage}*/}
            {/*            onClick={() => goToPage(page)}*/}
            {/*          >*/}
            {/*            {page}*/}
            {/*          </PaginationLink>*/}
            {/*        </PaginationItem>*/}
            {/*      );*/}
            {/*    })}*/}

            {/*  {users?.total_pages &&*/}
            {/*    users?.total_pages > 5 &&*/}
            {/*    currentPage < users?.total_pages - 2 && (*/}
            {/*      <PaginationItem>*/}
            {/*        <PaginationEllipsis />*/}
            {/*      </PaginationItem>*/}
            {/*    )}*/}

            {/*  <PaginationItem>*/}
            {/*    <PaginationNext onClick={handleNextPage} />*/}
            {/*  </PaginationItem>*/}
            {/*</PaginationContent>*/}
          </Pagination>
        </div>
      </main>
    </>
  );
}
