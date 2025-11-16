
import { encrypt } from "@/lib/ciphers";
import { Address, createWalletClient, http, isAddress } from "@arkiv-network/sdk";
import { privateKeyToAccount } from "@arkiv-network/sdk/accounts";
import { mendoza } from "@arkiv-network/sdk/chains";
import { ExpirationTime } from "@arkiv-network/sdk/utils";
import { NextRequest, NextResponse } from "next/server";

// Setup clients
const walletClient = createWalletClient({
  chain: mendoza,
  transport: http(),
  account: privateKeyToAccount(`0x00`)//process.env.PRIVATE_KEY as Address),
})


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { socials, address } = body;

    const conf = 'Sub0 Symbiosis'
    const code = body.code as string || 'C3D486B1D58F90867D6EAFACE7EED1EA7135FFE285B7E8EFE0D6D0CF6FCE75E7';

    if (!isAddress(address)) {
      return NextResponse.json(
        { error: "Valid address parameter is required" },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: "Code parameter is required" },
        { status: 400 }
      );
    }

    const payload = {
      socials
    }

    const encrypted = encrypt(payload, code);

      const timestamp = Date.now()

    const { entityKey, txHash } = await walletClient.createEntity({
      payload: Buffer.from(encrypted, 'utf8'),
      contentType: 'text/plain',
      attributes: [
        { key: 'type', value: 'arklink' },
        { key: 'conference', value: conf },
        { key: 'address', value: address },
        { key: 'timestamp', value: timestamp },
        { key: 'minter', value: walletClient.account.address },
        { key: 'encrypted', value: 'aes-256-gcm' },
      ],
      expiresIn: ExpirationTime.fromHours(12),
    })

    return NextResponse.json({
      key: entityKey,
      txHash,
      address
    });

  } catch (error) {
    console.error('Unexpected error in /api/code:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
