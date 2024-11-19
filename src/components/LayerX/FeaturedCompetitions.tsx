"use client";

import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CompetitionResponse } from "@/types/type";
import Pagination from "../common/Pagination";
import { CompetitionCard } from "./CompetitionCard";

export default function FeaturedCompetitions() {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [competitionList, setCompetitionList] =
    useState<CompetitionResponse | null>();
  const [loading, setLoading] = useState(false);

  const fetchAllCompetitions = async (page: number, recordsPerPage: number) => {
    try {
      setLoading(true);
      const res = await axios.get<CompetitionResponse>(
        `https://api.layerx.baboons.tech/api/nfts/competitions/?page=${page}&per_page=${recordsPerPage}`,
      );
      setCompetitionList(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong while fetching competition",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllCompetitions(currentPage, 9);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPaginationitemClick = (pageToFetch: number) => {
    setCurrentPage(pageToFetch);
  };

  const handleNextPage = () => {
    if (
      competitionList?.total_pages &&
      currentPage < competitionList?.total_pages
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box className="space-y-4 pb-20">
      {competitionList &&
        competitionList?.data?.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      {competitionList?.total_pages && (
        <Pagination
          handlePreviousPage={handlePrevPage}
          totalPages={competitionList?.total_pages}
          currentPage={currentPage}
          onPaginationitemClick={onPaginationitemClick}
          handleNextPage={handleNextPage}
        />
      )}
    </Box>
  );
}
