"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Sword, Trophy} from "lucide-react";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useRouter} from "next/navigation";
import axios from "axios";
import {User, UserResponse} from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/components/ui/pagination";
import Header from "@/components/ui/Header";
import {toast} from "@/hooks/use-toast";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [users, setUsers] = useState<UserResponse | null>(null);
    const [error, setError] = useState<any>(null);

    const [selectedFighter, setSelectedFighter] = useState<number | null>(null);

    const handleFighterSelect = (id: number) => {
        setSelectedFighter(id);
        router.push(`/battle?fighter=${id}`);
    };

    useEffect(() => {
        const fetchUsers = async (page: number, recordsPerPage: number) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.xpad-extension.baboons.tech/api/user/list/?page=${page}&per_page=${recordsPerPage}`
                );
                setUsers(response.data);
                setLoading(false);
            } catch (err: any) {
                console.log("err", err);
                setLoading(false);
                setError(err.message);
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers(currentPage, 10);
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


    return (
        <>
        <Header loggedInUser={loggedInUser} loading={loading}/>
            <main
                className="min-h-screen bg-gradient-to-b from-background via-background/95 to-card/90 text-white p-8 pt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 relative">
                        <div className="absolute inset-0 bg-brand-lime/5 blur-3xl rounded-full"></div>
                        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-brand-lime to-brand-white bg-clip-text text-transparent">
                            Ultimate Fighter Championship
                        </h1>
                        <p className="text-muted text-lg">
                            Choose your opponent to begin the battle
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center w-full">
                            <LoadingSpinner/>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {users &&
                                users!.results
                                    .filter((f) => f.id !== loggedInUser?.id)
                                    .map((user) => (
                                        <Card
                                            key={user.id}
                                            className={cn(
                                                "p-6 cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-b from-card/90 to-black/90 border-brand-lime/20 hover:border-brand-lime/40",
                                                selectedFighter === user.id && "ring-2 ring-brand-lime shadow-lg shadow-brand-lime/20"
                                            )}
                                            onClick={() => handleFighterSelect(user.id)}
                                        >
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="relative">
                                                    <Avatar className="w-24 h-24 ring-4 ring-brand-lime/20">
                                                        <AvatarImage src={user.avatar} alt={user.username}/>
                                                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1 rounded-full border border-brand-lime/20">
                                                        <div className="flex items-center space-x-1">
                                                            <Sword className="w-4 h-4 text-brand-lime"/>
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
                                        </Card>
                                    ))}
                        </div>
                    )}
                </div>
                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={handlePrevPage}/>
                            </PaginationItem>

                            {users &&
                                Array.from({length: users?.total_pages}, (_, index) => {
                                    const page = index + 1;
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() => goToPage(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                            {users?.total_pages &&
                                users?.total_pages > 5 &&
                                currentPage < users?.total_pages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                )}

                            <PaginationItem>
                                <PaginationNext onClick={handleNextPage}/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </>
    );
}