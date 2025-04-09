import { verifyAccount } from "@app/actions/verify-account";

export interface ConfirmAccountPageParams {
  token: string;
}

export interface ConfirmAccountPageProps {
  params: Promise<ConfirmAccountPageParams>;
}

export default async function ConfirmAccountPage({
  params,
}: ConfirmAccountPageProps) {
  const token = (await params).token;

  if (!token)
    return (
      <div>
        There was an error while trying to confrim account! Token not specified!
      </div>
    );

  const { error } = await verifyAccount(decodeURI(token));

  if (error) throw error;

  return <div>Account confirmed!</div>;
}
