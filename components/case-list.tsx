import React from "react";

interface BottomSheetProps {
  children?: React.ReactNode;
}

const CaseList = ({ children }: BottomSheetProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-medium font-semibold text-left md:text-center">
        Kasus Terlapor
      </p>
      <div className="bg-gray-400/10 rounded-lg">
        <div className="p-4">
          {children}
          <p>Line 1</p>
          <p>Line 2</p>
          <p>Line 3</p>
          <p>Line 4</p>
          <p>Line 5</p>
          <p>Line 6</p>
          <p>Line 7</p>
          <p>Line 8</p>
          <p>Line 9</p>
          <p>Line 10</p>
          <p>Line 11</p>
          <p>Line 12</p>
          <p>Line 13</p>
          <p>Line 14</p>
          <p>Line 15</p>
          <p>Line 16</p>
          <p>Line 17</p>
          <p>Line 18</p>
          <p>Line 19</p>
          <p>Line 20</p>
        </div>
      </div>
    </div>
  );
};

export default CaseList;
