import React from "react";
import { Button } from "../../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { useWebsite } from "../../../contexts/websiteContext";

export const WebsiteSwitcher = () => {
    const { setIsShowModal, websites, selectedWebsite, setSelectedWebsite } =
        useWebsite();

    return (
        <Select
            onValueChange={(value) => {
                setSelectedWebsite(
                    websites.find((website) => website.id === value),
                );
            }}
            value={selectedWebsite?.id}>
            <SelectTrigger className="w-[230px]">
                <SelectValue placeholder="Select a website" />
            </SelectTrigger>
            <SelectContent>
                {websites?.length > 0 &&
                    websites?.map((website) => (
                        <SelectItem key={website.id} value={website.id}>
                            {website.domain}
                        </SelectItem>
                    ))}
                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setIsShowModal(true)}>
                    Create
                </Button>
            </SelectContent>
        </Select>
    );
};
