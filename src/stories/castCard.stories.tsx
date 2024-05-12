import type { Meta, StoryObj } from "@storybook/react";
import CastCard from "../components/castCard";
import SampleCast from "./sampleCastData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
  title: "Home Page/CastCard",
  component: CastCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof CastCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    cast: SampleCast,
  },
};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleCast, profile_path: undefined };
export const Exceptional: Story = {
  args: {
    cast: sampleNoPoster,
  },
};
Exceptional.storyName = "Exception";
