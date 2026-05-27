"use client";

import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

import NoImage from "@/components/common/no-image";
import { Avatar, AvatarImage } from "@/components/shadcn-ui/avatar";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/shadcn-ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/shadcn-ui/input-group";
import type { Market } from "@/types/market";

interface MarketProfileCardProps {
  userId: string;
}

export default function MarketProfileCard({ userId }: MarketProfileCardProps) {
  const initialProfile = createDefaultMarketProfile(userId);
  const [marketInfo, setMarketInfo] = useState<Market>(initialProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이전 blob URL 해제
      if (marketInfo.profileImg) {
        URL.revokeObjectURL(marketInfo.profileImg);
      }
      setMarketInfo({ ...marketInfo, profileImg: URL.createObjectURL(file) });
    }
    // 같은 파일 재선택 허용
    event.target.value = "";
  };

  const handleResetImage = () => {
    if (marketInfo.profileImg) {
      URL.revokeObjectURL(marketInfo.profileImg);
    }
    setMarketInfo({ ...marketInfo, profileImg: null });
    toast.info("기본 프로필 이미지로 초기화했습니다.");
  };

  // 이름과 설명만 되돌리기 (이미지 미포함)
  const handleReset = () => {
    setMarketInfo({
      ...marketInfo,
      marketName: initialProfile.marketName,
      description: initialProfile.description,
    });
    toast.info("마켓 이름과 설명을 되돌렸습니다.");
  };

  // 이름과 설명만 변경하기 (이미지 미포함)
  const handleUpdate = () => {
    if (!marketInfo.marketName.trim()) {
      toast.error("마켓 이름을 입력해주세요.");
      return;
    }
    toast.success(
      `변경 완료 - 이름: ${marketInfo.marketName}, 설명: ${marketInfo.description}`,
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-6 py-6 sm:flex-row sm:items-start">
        {/* 프로필 이미지 영역 */}
        <div className="flex shrink-0 flex-col items-center gap-2 sm:items-start">
          <div className="relative">
            <Avatar
              className="size-24 cursor-pointer"
              onClick={handleImageClick}
            >
              {marketInfo.profileImg ? (
                <AvatarImage
                  src={marketInfo.profileImg}
                  alt={marketInfo.marketName}
                />
              ) : (
                <NoImage
                  size="full"
                  rounded="full"
                  ariaLabel="마켓 프로필 이미지"
                />
              )}
            </Avatar>
            {/* "+" 오버레이 */}
            <button
              type="button"
              className="bg-primary text-primary-foreground ring-background absolute right-1 bottom-1 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full ring-2 transition-opacity hover:opacity-80"
              onClick={handleImageClick}
              aria-label="프로필 이미지 변경"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {marketInfo.profileImg && (
            <Button
              variant="outline"
              size="xs"
              onClick={handleResetImage}
              className="h-auto max-w-24 whitespace-normal"
            >
              기본 이미지로 초기화
            </Button>
          )}
        </div>

        {/* 마켓 정보 입력 영역 */}
        <div className="flex w-full flex-col gap-4">
          {/* 마켓 이름 field */}
          <Field>
            <FieldLabel htmlFor="market-name" className="text-xs font-semibold">
              마켓 이름
            </FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupInput
                  id="market-name"
                  placeholder="마켓 이름을 입력하세요"
                  value={marketInfo.marketName}
                  onChange={(e) =>
                    setMarketInfo({
                      ...marketInfo,
                      marketName: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FieldContent>
          </Field>

          {/* 마켓 설명 field */}
          <Field>
            <FieldLabel
              htmlFor="market-description"
              className="text-xs font-semibold"
            >
              마켓 설명
            </FieldLabel>
            <FieldContent>
              <InputGroup className="h-auto">
                <InputGroupTextarea
                  id="market-description"
                  placeholder="마켓 설명을 입력하세요"
                  rows={3}
                  value={marketInfo.description}
                  onChange={(e) =>
                    setMarketInfo({
                      ...marketInfo,
                      description: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FieldContent>
          </Field>

          {/* 이름/설명 전용 버튼 영역 */}
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              되돌리기
            </Button>
            <Button variant="default" onClick={handleUpdate}>
              변경하기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function createDefaultMarketProfile(userId: string): Market {
  return {
    userId,
    marketName: userId + "의 마켓",
    description: "",
    profileImg: null,
  };
}
