// import { useSelector } from "react-redux"
// import { Button } from "../../../components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../components/ui/table"
// import { RootState } from "../../../global/redux/Store"
import { LiaWalletSolid } from "react-icons/lia";
import { useGetWalletQuery } from "../../../service/apiSlice";
import { useState } from "react";

const Transaction = () => {
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  
  const rawUserId = localStorage.getItem("scholarId");
  const userId = rawUserId ?? "";
  // console.log("user-id", userId);

  const wallet1 = useGetWalletQuery(userId, { skip: !userId }).data as { success: boolean; data: { balance: number; transactions: any[] } } | undefined;

  const wallet = wallet1?.data ?? { balance: 0, transactions: [] };
  
  // console.log("wallet1", wallet1);
  // console.log("wallet", wallet);
  
  // Sort transactions in descending order (latest first)
  const sortedTransactions = [...wallet.transactions].sort((a, b) => b.transactionId - a.transactionId);
  
  // Get current page transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
  
  return (
    <div className="pt-[15px] flex flex-col w-[100%] h-[100%]">
      <div className="flex items-center">
        <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
        <h3 className="text-[16px] font-semibold ml-[10px]">Transaction(s)</h3>
      </div>

      <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
        <div className="w-full md:w-[50%] lg:w-[30%] bg-[#8c301e] h-[180px] rounded-tr-[15px] rounded-bl-[15px] p-3 py-4 flex flex-col justify-between mb-[15px]">
          <h1 className="text-[#fff] font-[600] text-[25px] lg:text-[30px]">WALLET</h1>
          {isLoading ? (
            <p className="text-[#fff]">Loading...</p>
          ) : wallet ? (
            <div className="w-full flex justify-between items-center">
              <p className="text-[60px] lg:text-[70px] font-bold text-[#fff]">$
                {wallet?.balance}
              </p>
              <LiaWalletSolid className="text-[#fff] text-[70px] lg:text-[90px]" />
            </div>
          ) : (
            <p className="text-[13px] text-[#fff]">No wallet data found.</p>
          )} 
        </div>

        <Table>
          <TableHeader>
            <TableRow className="w-full sm:flex sm:flex-col text-[#9a9999]">
              <TableHead>Scholarship Title</TableHead>
              <TableHead>Expert</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <TableRow key={transaction.transactionId} className="w-full sm:flex sm:flex-col font-[600]">
                  <TableCell>{transaction.scholarship_title || "N/A"}</TableCell>
                  <TableCell>{transaction.expert_name.charAt(0).toUpperCase() + transaction.expert_name.slice(1) || "N/A"}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell className={transaction.status === "pending" ? "text-[#DFE702]" : "text-[#28A745]"}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </TableCell>
                  <TableCell className={transaction.type === "credit" ? "text-[#DFE702]" : "text-[#28A745]"}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No transactions found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-4 py-2 bg-gray-300 rounded-l-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 bg-gray-200">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 bg-gray-300 rounded-r-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transaction;
